import { Component, Emit, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { themes } from '@/constants/themes';
import gql from 'graphql-tag';

const TokenAuth = gql`
mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
    payload
    refreshToken
    refreshExpiresIn
  }
}
`;
const VerifyToken = gql`
mutation VerifyToken($token: String!) {
  verifyToken(token: $token) {
    payload
  }
}
`;
const RefreshToken = gql`
mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    token
    payload
    refreshToken
    refreshExpiresIn
  }
}
`;
const RevokeToken = gql`
mutation RevokeToken($refreshToken: String!) {
  revokeToken(refreshToken: $refreshToken) {
    revoked
  }
}
`;
const deleteTokenCookie = gql`
mutation {
  deleteTokenCookie {
    deleted
  }
}
`;
const deleteRefreshTokenCookie = gql`
mutation {
  deleteRefreshTokenCookie {
    deleted
  }
}
`;

@Component
export default class ThemeChanger extends Vue {
  @State private theme!: any;
  @Mutation private switchTheme: any;

  private selected: any = {};
  private themes: any = themes;
  private themeChangerModal: boolean = false;

  private created() {
    this.selected = this.theme;
  }

  @Emit()
  private themeChange(event: any, themeName: string) {
    this.switchTheme(themeName);
    localStorage.setItem('theme', themeName);
  }

  @Emit()
  private openThemeChangerModal(event: any) {
    this.themeChangerModal = true;
  }
  @Emit()
  private closeThemeChangerModal(event: any) {
    this.themeChangerModal = false;
  }
}
