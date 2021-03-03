import styled from 'styled-components/native';
import Colors from './colors';

function withDefault<T extends {defaultProps?: Partial<TDefaults>}, TDefaults>(
  o: T,
  defaultProps: TDefaults,
): T & {defaultProps: TDefaults} {
  o.defaultProps = defaultProps;
  return o as any;
}

// Base Public Sans, Weight 600
const BasePublicSansRegularText = withDefault(
  styled.Text`
    color: ${Colors.BLACK};
    font-family: 'PublicSans-SemiBold';
  `,
  {
    allowFontScaling: false,
  },
);

// Base Public Sans, Weight 800
const BasePublicSansExtraBoldText = withDefault(
  styled.Text`
    color: ${Colors.BLACK};
    font-family: 'PublicSans-ExtraBold';
  `,
  {
    allowFontScaling: false,
  },
);

// Base Poppins, Weight 900
const BasePoppinsBoldText = withDefault(
  styled.Text`
    color: ${Colors.BLACK};
    font-family: 'Poppins-Black';
  `,
  {
    allowFontScaling: false,
  },
);

const BaseTextInput = withDefault(
  styled.TextInput`
    font-size: 14px;
    font-family: 'PublicSans-Regular';
  `,
  {
    allowFontScaling: false,
  },
);

// Public Sans, Weight 600
const PublicSans600 = styled(BasePublicSansRegularText)``;
const PublicSans600Size10 = styled(BasePublicSansRegularText)`
  font-size: 10px;
`;
const PublicSans600Size12 = styled(BasePublicSansRegularText)`
  font-size: 12px;
`;
const PublicSans600Size14 = styled(BasePublicSansRegularText)`
  font-size: 14px;
`;
const PublicSans600Size16 = styled(BasePublicSansRegularText)`
  font-size: 16px;
`;
const publicSans600 = {
  PublicSans600,
  PublicSans600Size10,
  PublicSans600Size12,
  PublicSans600Size14,
  PublicSans600Size16,
};

// Public Sans, Weight 800
const PublicSans800 = styled(BasePublicSansExtraBoldText)``;
const PublicSans800Size10 = styled(BasePublicSansExtraBoldText)`
  font-size: 10px;
`;
const PublicSans800Size12 = styled(BasePublicSansExtraBoldText)`
  font-size: 12px;
`;
const PublicSans800Size14 = styled(BasePublicSansExtraBoldText)`
  font-size: 14px;
`;
const PublicSans800Size16 = styled(BasePublicSansExtraBoldText)`
  font-size: 16px;
`;
const PublicSans800Size19 = styled(BasePublicSansExtraBoldText)`
  font-size: 19px;
`;
const publicSans800 = {
  PublicSans800,
  PublicSans800Size10,
  PublicSans800Size12,
  PublicSans800Size14,
  PublicSans800Size16,
  PublicSans800Size19,
};

// Poppins, Weight 900
const Poppins900 = styled(BasePoppinsBoldText)``;
const Poppins900Size10 = styled(BasePoppinsBoldText)`
  font-size: 10px;
`;
const Poppins900Size12 = styled(BasePoppinsBoldText)`
  font-size: 12px;
`;
const Poppins900Size14 = styled(BasePoppinsBoldText)`
  font-size: 14px;
`;
const Poppins900Size16 = styled(BasePoppinsBoldText)`
  font-size: 16px;
`;
const Poppins900Size18 = styled(BasePoppinsBoldText)`
  font-size: 18px;
`;
const Poppins900Size20 = styled(BasePoppinsBoldText)`
  font-size: 20px;
`;
const poppins900 = {
  Poppins900,
  Poppins900Size10,
  Poppins900Size12,
  Poppins900Size14,
  Poppins900Size16,
  Poppins900Size18,
  Poppins900Size20,
};

export default {
  BaseTextInput,
  ...publicSans600,
  ...publicSans800,
  ...poppins900,
};
