module {
  type OldActor = {
    recaptchaSecretKey : ?Text;
    recaptchaMinScore : Float;
  };
  type NewActor = {
    recaptchaSecretKey : Text;
    recaptchaMinScore : Float;
  };

  public func run(old : OldActor) : NewActor {
    {
      recaptchaSecretKey = switch (old.recaptchaSecretKey) {
        case (null) { "" };
        case (?key) { key };
      };
      recaptchaMinScore = old.recaptchaMinScore;
    };
  };
};
