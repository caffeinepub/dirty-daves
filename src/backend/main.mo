import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System
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
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact Form System
  type ContactSubmission = {
    id : Text;
    name : Text;
    email : Text;
    subject : Text; // New subject field added!
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

  func createContactSubmission(name : Text, email : Text, subject : Text, message : Text) : ContactSubmission {
    let id = name.concat(email).concat(subject).concat(message).concat(Time.now().toText());
    {
      id;
      name;
      email;
      subject;
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

  // Public contact form submission - accessible to everyone including guests
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, subject : Text, message : Text) : async Text {
    // No authorization check - contact forms should be publicly accessible
    let newSubmission = createContactSubmission(name, email, subject, message);
    insertContactSubmission(newSubmission);
    newSubmission.id;
  };

  // Admin-only function to view all contact submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    let submissions = Array.fromIter(contactSubmissions.values());
    submissions.sort(ContactSubmission.compareByTimestamp);
  };
};
