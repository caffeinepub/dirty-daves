import Map "mo:core/Map";

module {
  // Old type without phone fields
  type OldContactSubmission = {
    id : Text;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  type OldActor = {
    contactSubmissions : Map.Map<Text, OldContactSubmission>;
  };

  // New type with phone fields
  type NewContactSubmission = {
    id : Text;
    name : Text;
    email : Text;
    phoneCountryCode : Text;
    phoneNumber : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  type NewActor = {
    contactSubmissions : Map.Map<Text, NewContactSubmission>;
  };

  // Add default values for phone fields on migration
  public func run(old : OldActor) : NewActor {
    let newContactSubmissions = old.contactSubmissions.map<Text, OldContactSubmission, NewContactSubmission>(
      func(_id, oldContactSubmission) {
        { oldContactSubmission with phoneCountryCode = ""; phoneNumber = "" };
      }
    );
    { contactSubmissions = newContactSubmissions };
  };
};
