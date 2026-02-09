import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import OutCall "http-outcalls/outcall";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save and update profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact Form system (no phone or subject)
  type ContactSubmission = {
    id : Text;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module ContactSubmission {
    public func compare(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      switch (Text.compare(a.id, b.id)) {
        case (#equal) { Int.compare(a.timestamp, b.timestamp) };
        case (order) { order };
      };
    };

    public func compareByTimestamp(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let contactSubmissionsJunk = Map.empty<Text, ContactSubmission>();

  func createContactSubmission(name : Text, email : Text, message : Text) : ContactSubmission {
    let id = name.concat(email).concat(message).concat(Time.now().toText());
    {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
  };

  func insertContactSubmission(submission : ContactSubmission) {
    let id = submission.id;
    switch (contactSubmissions.get(id)) {
      case (?existing) {
        if (existing == submission) { Runtime.trap("Identical inquiry submission already exists") };
      };
      case (null) {
        contactSubmissions.add(id, submission);
      };
    };
  };

  func insertContactSubmissionJunk(submission : ContactSubmission) {
    let id = submission.id;
    switch (contactSubmissionsJunk.get(id)) {
      case (?existing) {
        if (existing == submission) { Runtime.trap("Identical junk submission already exists") };
      };
      case (null) {
        contactSubmissionsJunk.add(id, submission);
      };
    };
  };

  // Admin-only: Retrieve all junk contact submissions
  public query ({ caller }) func getAllContactSubmissionsJunk() : async [ContactSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all junk submissions");
    };
    let submissions = Array.fromIter(contactSubmissionsJunk.values());
    submissions.sort(ContactSubmission.compareByTimestamp);
  };

  var recaptchaSecretKey : ?Text = null;
  var recaptchaMinScore : Float = 0.6;

  type RecaptchaResult = {
    success : Bool;
    score : Float;
  };

  func parseRecaptchaResponse(response : Text) : ?RecaptchaResult {
    let score = (response.contains(#char 't') or response.contains(#char 'T'));
    if (response.contains(#text "ratedgood")) {
      ?{
        success = score;
        score = 0.9;
      };
    } else if (response.contains(#text "ratedfair")) {
      ?{
        success = score;
        score = 0.5;
      };
    } else if (response.contains(#text "ratedbad")) {
      if (score) {
        ?{ success = true; score = 0.2 };
      } else {
        ?{ success = false; score = 0.0 };
      };
    } else {
      ?{ success = score; score = 0.0 };
    };
  };

  public shared query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  func verifyRecaptcha(token : Text) : async Float {
    switch (recaptchaSecretKey) {
      case (?key) {
        let url = "https://www.google.com/recaptcha/api/siteverify?secret=" # key # "&response=" # token;
        let result = await OutCall.httpGetRequest(url, [], transform);
        switch (parseRecaptchaResponse(result)) {
          case (?{ success; score }) {
            if (success) { score } else { 0 };
          };
          case (null) { 0 };
        };
      };
      case (null) { 0 };
    };
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text, honeypot : Text, elapsedTime : Float, _recaptchaToken : Text) : async Text {
    let newSubmission = createContactSubmission(name, email, message);

    if (honeypot != "" or elapsedTime < 1.0) {
      insertContactSubmissionJunk(newSubmission);
      return newSubmission.id;
    };

    insertContactSubmission(newSubmission);
    newSubmission.id;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    let submissions = Array.fromIter(contactSubmissions.values());
    submissions.sort(ContactSubmission.compareByTimestamp);
  };

  // Admin-only: Update reCAPTCHA secret key
  public shared ({ caller }) func updateRecaptchaSecret(key : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update reCAPTCHA secret");
    };
    recaptchaSecretKey := ?key;
  };

  // Admin-only: Update reCAPTCHA minimum score threshold
  public shared ({ caller }) func updateRecaptchaMinScore(score : Float) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update reCAPTCHA minimum score");
    };
    recaptchaMinScore := score;
  };
};
