interface UserMetadata {
  /** Time the user was created. */
  readonly creationTime?: string;
  /** Time the user last signed in. */
  readonly lastSignInTime?: string;
}

/**
 * User profile information.
 *
 * @public
 */

export declare interface UserInfra {
  /**
   * The display name of the user.
   */
  readonly displayName: string | null;
  /**
   * The email of the user.
   */
  readonly email: string | null;
  /**
   * The phone number normalized based on the E.164 standard (e.g. +16505550101) for the
   * user.
   *
   */
  readonly phoneNumber: string | null;
  /**
   * The profile photo URL of the user.
   */
  readonly photoURL: string | null;
  /**
   * The provider used to authenticate the user.
   */
  readonly providerId: string;
  /**
   * The user's unique ID, scoped to the project.
   */
  readonly id: string;

  /**
   * Additional metadata around user creation and sign-in times.
   */
  readonly metadata: UserMetadata;
}
