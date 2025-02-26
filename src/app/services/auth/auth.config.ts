import { AuthConfig } from 'angular-oauth2-oidc';
import { ClassroomScopes } from '../../utils/constants/classroom-scopes.constants';
import { Oauth2Scopes } from '../../utils/constants/oauth2-scopes.constants';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  clientId: '77186774552-da42u8o6391arqf1t9u5cn4g8icdbbn2.apps.googleusercontent.com',
  redirectUri: 'http://localhost:4200/callback',
  scope: "openid profile email" + " " + 
  ClassroomScopes.CLASSROOM_COURSES + " " + 
  ClassroomScopes.CLASSROOM_COURSEWORK_STUDENTS + " " + 
  ClassroomScopes.CLASSROOM_COURSEWORK_STUDENTS_READONLY + " " + 
  ClassroomScopes.CLASSROOM_COURSEWORK_ME + " " + 
  ClassroomScopes.CLASSROOM_COURSEWORK_ME_READONLY + " " + 
  ClassroomScopes.CLASSROOM_ROSTERS + " " + 
  ClassroomScopes.CLASSROOM_PROFILE_EMAILS + " " + 
  ClassroomScopes.CLASSROOM_PROFILE_PHOTOS + " " + 
  Oauth2Scopes.USERINFO_PROFILE
};