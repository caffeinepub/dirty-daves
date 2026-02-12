import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

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

  //------------------- Contact Form System -------------------------

  public type ContactSubmission = {
    name : Text;
    email : Text;
    phoneCountryCallingCode : Text;
    phoneNumber : Text;
    message : Text;
    timestamp : Int;
  };

  module ContactSubmission {
    public func compare(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let contactSubmissions = Map.empty<Text, ContactSubmission>();

  func createContactSubmission(
    name : Text,
    email : Text,
    phoneCountryCode : Text,
    phoneNumber : Text,
    message : Text,
  ) : ContactSubmission {
    {
      name;
      email;
      phoneCountryCallingCode = phoneCountryCode;
      phoneNumber;
      message;
      timestamp = Time.now();
    };
  };

  public query ({ caller }) func isAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // Admin-only: Retrieve all contact submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    authorizeAdminOnly(caller);
    let submissions = contactSubmissions.values().toArray();
    submissions.sort();
  };

  public shared ({ caller }) func submitContactForm(
    name : Text,
    email : Text,
    phoneCountry : Text,
    phoneNumber : Text,
    message : Text,
    _honeypot : Text,
    _elapsedTime : Float,
  ) : async Text {
    if (phoneCountry != "" and phoneNumber == "") {
      Runtime.trap("If country code is set, phone number must be present");
    };

    let newSubmission = createContactSubmission(name, email, phoneCountry, phoneNumber, message);
    contactSubmissions.add(email, newSubmission);
    email;
  };

  // Test endpoint - accessible to anyone
  public query ({ caller }) func testConnection() : async Text {
    "test";
  };

  public query ({ caller }) func getDeploymentInfo() : async {
    canisterTime : Int;
  } {
    let canisterTime = Time.now();
    {
      canisterTime;
    };
  };
};
