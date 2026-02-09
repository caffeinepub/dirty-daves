import Map "mo:core/Map";

module {
  type OldContactSubmission = {
    id : Text;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type OldActor = {
    contactSubmissions : Map.Map<Text, OldContactSubmission>;
    contactSubmissionsJunk : Map.Map<Text, OldContactSubmission>;
  };

  type NewContactSubmission = {
    id : Text;
    name : Text;
    email : Text;
    phoneCountryCallingCode : Text;
    phoneNumber : Text;
    message : Text;
    timestamp : Int;
  };

  type NewActor = {
    contactSubmissions : Map.Map<Text, NewContactSubmission>;
    contactSubmissionsJunk : Map.Map<Text, NewContactSubmission>;
  };

  public func run(old : OldActor) : NewActor {
    let newContactSubmissions = old.contactSubmissions.map<Text, OldContactSubmission, NewContactSubmission>(
      func(_id, oldSubmission) {
        {
          oldSubmission with
          phoneCountryCallingCode = "";
          phoneNumber = "";
        };
      }
    );

    let newContactSubmissionsJunk = old.contactSubmissionsJunk.map<Text, OldContactSubmission, NewContactSubmission>(
      func(_id, oldSubmission) {
        {
          oldSubmission with
          phoneCountryCallingCode = "";
          phoneNumber = "";
        };
      }
    );

    {
      contactSubmissions = newContactSubmissions;
      contactSubmissionsJunk = newContactSubmissionsJunk;
    };
  };
};
