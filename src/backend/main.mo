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
import Migration "migration";

(with migration = Migration.run)
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

  // Track whether first admin has been bootstrapped
  // This flag is set to true after the first successful admin assignment
  var firstAdminBootstrapped : Bool = false;

  // Temporary - public method to reset admin bootstrap
  public shared ({ caller }) func resetBootstrap() : async () {
    firstAdminBootstrapped := false;
  };

  //------------------- Set Admin -------------------------
  /// Allows first admin to bootstrap system via self-assign when
  /// no admin has been set yet (firstAdminBootstrapped == false).
  ///
  /// After first admin has been assigned, all further
  /// assignments require the caller to be an existing admin.
  ///
  /// Bootstrap check: Uses a persistent flag 'firstAdminBootstrapped'
  /// to determine if the system has been initialized with an admin.
  public shared ({ caller }) func setMeAsAdmin() : async () {
    if (not firstAdminBootstrapped) {
      // Bootstrap phase: allow first caller to become admin
      AccessControl.assignRole(accessControlState, caller, caller, #admin);
      firstAdminBootstrapped := true;
    } else { // Normal operation: only existing admins can assign roles
      if (not AccessControl.isAdmin(accessControlState, caller)) {
        Runtime.trap("Unauthorized: Only admins can assign user roles");
      };
      AccessControl.assignRole(accessControlState, caller, caller, #admin);
    };
  };

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

  // Admin-only: Retrieve all contact submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    authorizeAdminOnly(caller);
    let submissions = contactSubmissions.values().toArray();
    submissions.sort();
  };

  // Public endpoint - no authorization required for contact form submission.
  // This allows anonymous users to submit contact forms.
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

  //------------------- Utility Endpoints -------------------------
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
