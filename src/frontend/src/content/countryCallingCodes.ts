export interface CountryCallingCodeOption {
  value: string;
  callingCode: string;
  countryAbbrev: string;
  label: string;
}

export const countryCallingCodes: CountryCallingCodeOption[] = [
  { value: 'US', callingCode: '+1', countryAbbrev: 'US', label: '+1 US' },
  { value: 'GB', callingCode: '+44', countryAbbrev: 'GB', label: '+44 GB' },
  { value: 'CA', callingCode: '+1', countryAbbrev: 'CA', label: '+1 CA' },
  { value: 'AU', callingCode: '+61', countryAbbrev: 'AU', label: '+61 AU' },
  { value: 'NZ', callingCode: '+64', countryAbbrev: 'NZ', label: '+64 NZ' },
  { value: 'IE', callingCode: '+353', countryAbbrev: 'IE', label: '+353 IE' },
  { value: 'DE', callingCode: '+49', countryAbbrev: 'DE', label: '+49 DE' },
  { value: 'FR', callingCode: '+33', countryAbbrev: 'FR', label: '+33 FR' },
  { value: 'ES', callingCode: '+34', countryAbbrev: 'ES', label: '+34 ES' },
  { value: 'IT', callingCode: '+39', countryAbbrev: 'IT', label: '+39 IT' },
  { value: 'NL', callingCode: '+31', countryAbbrev: 'NL', label: '+31 NL' },
  { value: 'BE', callingCode: '+32', countryAbbrev: 'BE', label: '+32 BE' },
  { value: 'CH', callingCode: '+41', countryAbbrev: 'CH', label: '+41 CH' },
  { value: 'AT', callingCode: '+43', countryAbbrev: 'AT', label: '+43 AT' },
  { value: 'SE', callingCode: '+46', countryAbbrev: 'SE', label: '+46 SE' },
  { value: 'NO', callingCode: '+47', countryAbbrev: 'NO', label: '+47 NO' },
  { value: 'DK', callingCode: '+45', countryAbbrev: 'DK', label: '+45 DK' },
  { value: 'FI', callingCode: '+358', countryAbbrev: 'FI', label: '+358 FI' },
  { value: 'PL', callingCode: '+48', countryAbbrev: 'PL', label: '+48 PL' },
  { value: 'JP', callingCode: '+81', countryAbbrev: 'JP', label: '+81 JP' },
];
