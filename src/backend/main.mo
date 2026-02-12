import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  //------------------- User Management System -------------------------
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  func authorizeAdminOnly(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
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
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  //------------------- NEW: Username/Password Bootstrapping -------------------------

  var isBootstrapped : Bool = false;

  func isPasswordValid(userName : Text, password : Text) : Bool {
    userName == "dirtydave69" and password == "Tomlikesboys69";
  };

  public shared ({ caller }) func bootstrapAdminWithCredentials(userName : Text, password : Text) : async () {
    // First check if already bootstrapped
    if (isBootstrapped) {
      Runtime.trap("Admin already bootstrapped. Bootstrapping can only be done once.");
    };
    if (not isPasswordValid(userName, password)) {
      Runtime.trap("Login failed: Invalid credentials (username/password incorrect)");
    };

    // Store the credentials and mark as bootstrapped
    isBootstrapped := true;

    // Grant admin role to caller
    AccessControl.initialize(accessControlState, caller, "adminToken", "userProvidedToken");
  };

  func verifyCredentials(userName : Text, password : Text) : Nat {
    if (not isPasswordValid(userName, password)) {
      Runtime.trap("Invalid username or password");
    };
    getAllContactSubmissionsSize();
  };

  //------------------- NEW: System User Management -------------------------

  let systemUserCounter = Map.empty<Text, Nat>();

  public shared ({ caller }) func incrementSystemUserCounter(userName : Text, password : Text) : async Nat {
    // Require admin permission for this operation
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    ignore verifyCredentials(userName, password);
    let currentCount = switch (systemUserCounter.get(userName)) {
      case (?count) { count };
      case (null) { 0 };
    };
    let newCount = currentCount + 1;
    systemUserCounter.add(userName, newCount);
    newCount;
  };

  //------------------- Contact Form System without reCAPTCHA -------------------------

  public type ContactSubmission = {
    id : Text;
    name : Text;
    email : Text;
    phoneCountryCallingCode : Text;
    phoneNumber : Text;
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

  func createContactSubmission(
    name : Text,
    email : Text,
    phoneCountryCode : Text,
    phoneNumber : Text,
    message : Text,
  ) : ContactSubmission {
    let id = name.concat(email).concat(message).concat(Time.now().toText());
    {
      id;
      name;
      email;
      phoneCountryCallingCode = phoneCountryCode;
      phoneNumber;
      message;
      timestamp = Time.now();
    };
  };

  func insertContactSubmission(submission : ContactSubmission) : () {
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

  func insertContactSubmissionJunk(submission : ContactSubmission) : () {
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
    authorizeAdminOnly(caller);
    let submissions = contactSubmissionsJunk.values().toArray();
    submissions.sort(ContactSubmission.compareByTimestamp);
  };

  // Admin-only: Retrieve all contact submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    authorizeAdminOnly(caller);
    let submissions = contactSubmissions.values().toArray();
    submissions.sort(ContactSubmission.compareByTimestamp);
  };

  func getAllContactSubmissionsSize() : Nat {
    contactSubmissions.size();
  };

  // Contact form submission without reCAPTCHA - accessible to anyone including guests
  public shared ({ caller }) func submitContactForm(
    name : Text,
    email : Text,
    phoneCountry : Text,
    phoneNumber : Text,
    message : Text,
    honeypot : Text,
    elapsedTime : Float,
  ) : async Text {
    if (phoneCountry != "" and phoneNumber == "") {
      Runtime.trap("If country code is set, phone number must be present");
    };

    let newSubmission = createContactSubmission(name, email, phoneCountry, phoneNumber, message);

    if (honeypot != "") {
      insertContactSubmissionJunk(newSubmission);
      return newSubmission.id;
    };

    if (elapsedTime < 1.0) {
      insertContactSubmissionJunk(newSubmission);
      Runtime.trap("Form submitted too fast, likely not human but bot");
    } else if (elapsedTime < 2.0) {
      insertContactSubmissionJunk(newSubmission);
      return newSubmission.id;
    };

    insertContactSubmission(newSubmission);
    newSubmission.id;
  };

  // Test endpoint - accessible to anyone
  public query ({ caller }) func testConnection() : async Text {
    "test";
  };
};

