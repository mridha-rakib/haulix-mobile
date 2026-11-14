import { changeLocale, getCurrentLocale, i18next, initI18n } from "./index";
import en from "./locales/en";
import es from "./locales/es";

describe("@haulix/i18n — C06 Localization & Switching", () => {
  beforeAll(async () => {
    await initI18n("en");
  });

  it("verifies en and es keys mirror each other symmetrically", () => {
    const enSignInKeys = Object.keys(en.signIn).sort();
    const esSignInKeys = Object.keys(es.signIn).sort();
    expect(enSignInKeys).toEqual(esSignInKeys);

    const enCreateKeys = Object.keys(en.createAccount).sort();
    const esCreateKeys = Object.keys(es.createAccount).sort();
    expect(enCreateKeys).toEqual(esCreateKeys);

    const enVerifyKeys = Object.keys(en.verifyPhone).sort();
    const esVerifyKeys = Object.keys(es.verifyPhone).sort();
    expect(enVerifyKeys).toEqual(esVerifyKeys);

    const enSocialKeys = Object.keys(en.socialReturn).sort();
    const esSocialKeys = Object.keys(es.socialReturn).sort();
    expect(enSocialKeys).toEqual(esSocialKeys);

    const enAccountKeys = Object.keys(en.account).sort();
    const esAccountKeys = Object.keys(es.account).sort();
    expect(enAccountKeys).toEqual(esAccountKeys);

    const enNavKeys = Object.keys(en.nav).sort();
    const esNavKeys = Object.keys(es.nav).sort();
    expect(enNavKeys).toEqual(esNavKeys);

    const enPhotoKeys = Object.keys(en.photo).sort();
    const esPhotoKeys = Object.keys(es.photo).sort();
    expect(enPhotoKeys).toEqual(esPhotoKeys);

    const enEditKeys = Object.keys(en.editProfile).sort();
    const esEditKeys = Object.keys(es.editProfile).sort();
    expect(enEditKeys).toEqual(esEditKeys);

    const enProfileUpdatedKeys = Object.keys(en.profileUpdated).sort();
    const esProfileUpdatedKeys = Object.keys(es.profileUpdated).sort();
    expect(enProfileUpdatedKeys).toEqual(esProfileUpdatedKeys);
  });

  it("verifies exact C10-S English strings from Figma node 333:171", () => {
    expect(en.profileUpdated.title).toBe("Profile updated.");
    expect(en.profileUpdated.subtitle).toBe("Your customer details are ready for future bookings.");
    expect(en.profileUpdated.accountChipSuffix).toBe("CUSTOMER ACCOUNT");
    expect(en.profileUpdated.cardTitle).toBe("Saved profile");
    expect(en.profileUpdated.changesSavedPrefix).toBe("Changes saved ·");
    expect(en.profileUpdated.emailLabel).toBe("Email");
    expect(en.profileUpdated.verifiedPhoneLabel).toBe("Verified phone");
    expect(en.profileUpdated.pendingPhoneLabel).toBe("Phone · verification pending");
    expect(en.profileUpdated.note).toBe(
      "Profile changes will not modify existing completed booking records."
    );
    expect(en.profileUpdated.backToAccount).toBe("Back to My Account");
    expect(en.profileUpdated.savedAddresses).toBe("Saved Addresses");
  });

  it("verifies exact C10-E English strings from Figma node 333:116", () => {
    expect(en.editProfile.screenTitle).toBe("Edit profile");
    expect(en.editProfile.screenDescription).toBe(
      "Only customer-owned contact details can be edited here."
    );
    expect(en.editProfile.customerAccountBadge).toBe("SARAH MITCHELL  ·  CUSTOMER ACCOUNT");
    expect(en.editProfile.cardTitle).toBe("Profile information");
    expect(en.editProfile.labelFullName).toBe("FULL NAME");
    expect(en.editProfile.defaultFullName).toBe("Sarah Mitchell");
    expect(en.editProfile.labelEmail).toBe("EMAIL");
    expect(en.editProfile.defaultEmail).toBe("sarah.mitchell@example.test");
    expect(en.editProfile.labelPhone).toBe("PHONE");
    expect(en.editProfile.defaultPhone).toBe("+1 602-555-0142");
    expect(en.editProfile.phoneGuidance).toBe(
      "Phone changes require successful verification before use."
    );
    expect(en.editProfile.saveChanges).toBe("Save Changes");
    expect(en.editProfile.cancelEditing).toBe("Cancel Editing");
  });

  it("verifies exact C10 English strings from Figma node 333:26", () => {
    expect(en.account.title).toBe("My Account");
    expect(en.account.subtitle).toBe(
      "Manage your HAULIX customer profile and booking preferences."
    );
    expect(en.account.statusChip).toBe("SARAH MITCHELL · CUSTOMER ACCOUNT");
    expect(en.account.verifiedCustomerHeader).toBe("Verified customer");
    expect(en.account.customerName).toBe("Sarah Mitchell");
    expect(en.account.emailValue).toBe("sarah.mitchell@example.test");
    expect(en.account.phoneValue).toBe("+1 602-555-0142");
    expect(en.account.accountVerifiedStatus).toBe("Account verified · Arizona service area");
    expect(en.account.preferencesHeader).toBe("Account & preferences");
    expect(en.account.savedAddressValue).toBe("1234 E Example Lane, Phoenix");
    expect(en.account.languageValue).toBe("English (United States)");
    expect(en.account.paymentMethodsValue).toBe("TEST payment reference saved");
    expect(en.account.activeBookingValue).toBe("HX-DEMO-1027 · Junk Removal");
    expect(en.account.signOut).toBe("↗ Sign out");
    expect(en.account.languageSwitch).toBe("🌐 Español · Cambiar idioma");
    expect(en.account.securityShortcutsHeader).toBe("SECURITY & PROFILE PHOTO");
    expect(en.account.changePassword).toBe("Change password");
    expect(en.account.profilePhoto).toBe("Profile photo · Add / change / remove");
    expect(en.account.editProfile).toBe("Edit Profile");
    expect(en.account.savedAddresses).toBe("Saved Addresses");
  });

  it("verifies exact C10 Spanish translation strings from Figma node 347:315", () => {
    expect(es.account.title).toBe("Mi cuenta");
    expect(es.account.subtitle).toBe("Administra tu perfil y tus preferencias de servicio.");
    expect(es.account.description).toBe("Administra tu perfil y tus preferencias de servicio.");
    expect(es.account.statusChip).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
    expect(es.account.session).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
    expect(es.account.verifiedCustomerHeader).toBe("Cliente verificado");
    expect(es.account.verifiedTitle).toBe("Cliente verificado");
    expect(es.account.customerLabel).toBe("Cliente");
    expect(es.account.customerName).toBe("Bryan Lopez");
    expect(es.account.demoName).toBe("Bryan Lopez");
    expect(es.account.initials).toBe("BL");
    expect(es.account.demoInitials).toBe("BL");
    expect(es.account.emailLabel).toBe("Correo");
    expect(es.account.emailValue).toBe("bryan.lopez@example.test");
    expect(es.account.demoEmail).toBe("bryan.lopez@example.test");
    expect(es.account.phoneLabel).toBe("Teléfono verificado");
    expect(es.account.phoneVerified).toBe("Teléfono verificado");
    expect(es.account.phoneValue).toBe("+1 602-555-0142");
    expect(es.account.demoPhone).toBe("+1 602-555-0142");
    expect(es.account.accountVerifiedStatus).toBe("Cuenta verificada · Zona de Arizona");
    expect(es.account.verificationDescription).toBe("Cuenta verificada · Zona de Arizona");
    expect(es.account.preferencesHeader).toBe("Cuenta y preferencias");
    expect(es.account.preferencesTitle).toBe("Cuenta y preferencias");
    expect(es.account.savedAddressLabel).toBe("Dirección de recogida");
    expect(es.account.pickupLabel).toBe("Dirección de recogida");
    expect(es.account.savedAddressValue).toBe("1234 E Example Lane, Phoenix");
    expect(es.account.pickupValue).toBe("1234 E Example Lane, Phoenix");
    expect(es.account.languageLabel).toBe("Idioma");
    expect(es.account.languageValue).toBe("Español (Estados Unidos)");
    expect(es.account.paymentMethodsLabel).toBe("Métodos de pago");
    expect(es.account.paymentLabel).toBe("Métodos de pago");
    expect(es.account.paymentMethodsValue).toBe("Referencia de prueba guardada");
    expect(es.account.paymentValue).toBe("Referencia de prueba guardada");
    expect(es.account.activeBookingLabel).toBe("Reserva activa");
    expect(es.account.bookingLabel).toBe("Reserva activa");
    expect(es.account.activeBookingValue).toBe("HX-DEMO-1027 · Retirada de objetos");
    expect(es.account.bookingValue).toBe("HX-DEMO-1027 · Retirada de objetos");
    expect(es.account.signOut).toBe("↗ Cerrar sesión");
    expect(es.account.languageSwitch).toBe("Español seleccionado · Cambiar a inglés");
    expect(es.account.changeLanguage).toBe("Español seleccionado · Cambiar a inglés");
    expect(es.account.securityShortcutsHeader).toBe("SEGURIDAD Y FOTO DE PERFIL");
    expect(es.account.securityHeading).toBe("SEGURIDAD Y FOTO DE PERFIL");
    expect(es.account.changePassword).toBe("Cambiar contraseña");
    expect(es.account.profilePhoto).toBe("Foto · Añadir / cambiar / eliminar");
    expect(es.account.photoShortcut).toBe("Foto · Añadir / cambiar / eliminar");
    expect(es.account.editProfile).toBe("Editar perfil");
    expect(es.account.savedAddresses).toBe("Direcciones guardadas");
  });

  it("verifies exact C10 Spanish navbar strings from Figma node 965:10500", () => {
    expect(es.nav.home).toBe("Inicio");
    expect(es.nav.myJobs).toBe("Mis trabajos");
    expect(es.nav.book).toBe("Reservar");
    expect(es.nav.deals).toBe("Ofertas");
    expect(es.nav.account).toBe("Cuenta");
  });

  it("verifies exact C10 Spanish profile photo action sheet strings", () => {
    expect(es.photo.title).toBe("Foto de perfil");
    expect(es.photo.chooseGallery).toBe("Elegir de la galería");
    expect(es.photo.takePhoto).toBe("Tomar foto");
    expect(es.photo.changeGallery).toBe("Cambiar desde la galería");
    expect(es.photo.takeNewPhoto).toBe("Tomar otra foto");
    expect(es.photo.remove).toBe("Eliminar foto");
    expect(es.photo.save).toBe("Guardar foto");
    expect(es.photo.cancel).toBe("Cancelar");
    expect(es.photo.removeConfirmTitle).toBe("¿Eliminar la foto de perfil?");
    expect(es.photo.confirmRemove).toBe("Eliminar");
    expect(es.photo.keep).toBe("Conservar foto");
    expect(es.photo.permissionDenied).toBe("Permiso denegado");
    expect(es.photo.selectError).toBe("No se pudo cargar la foto");
  });

  it("verifies exact C10-E Spanish translation strings matching translation mapping", () => {
    expect(es.editProfile.screenTitle).toBe("Editar perfil");
    expect(es.editProfile.title).toBe("Editar perfil");
    expect(es.editProfile.screenDescription).toBe("Aquí solo puedes editar tus datos de contacto.");
    expect(es.editProfile.subtitle).toBe("Aquí solo puedes editar tus datos de contacto.");
    expect(es.editProfile.customerAccountBadge).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
    expect(es.editProfile.accountChip).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
    expect(es.editProfile.cardTitle).toBe("Información del perfil");
    expect(es.editProfile.labelFullName).toBe("NOMBRE COMPLETO");
    expect(es.editProfile.fullNameLabel).toBe("NOMBRE COMPLETO");
    expect(es.editProfile.defaultFullName).toBe("Bryan Lopez");
    expect(es.editProfile.defaultName).toBe("Bryan Lopez");
    expect(es.editProfile.labelEmail).toBe("CORREO ELECTRÓNICO");
    expect(es.editProfile.emailLabel).toBe("CORREO ELECTRÓNICO");
    expect(es.editProfile.defaultEmail).toBe("bryan.lopez@example.test");
    expect(es.editProfile.labelPhone).toBe("TELÉFONO");
    expect(es.editProfile.phoneLabel).toBe("TELÉFONO");
    expect(es.editProfile.defaultPhone).toBe("+1 602-555-0142");
    expect(es.editProfile.phoneGuidance).toBe(
      "Los cambios de número de teléfono requieren verificación antes de usarse."
    );
    expect(es.editProfile.phoneHelp).toBe(
      "Los cambios de número de teléfono requieren verificación antes de usarse."
    );
    expect(es.editProfile.saveChanges).toBe("Guardar cambios");
    expect(es.editProfile.save).toBe("Guardar cambios");
    expect(es.editProfile.cancelEditing).toBe("Cancelar edición");
    expect(es.editProfile.cancel).toBe("Cancelar edición");
    expect(es.editProfile.errorNameRequired).toBe("El nombre completo es obligatorio.");
    expect(es.editProfile.requiredName).toBe("El nombre completo es obligatorio.");
    expect(es.editProfile.errorEmailInvalid).toBe(
      "Introduce una dirección de correo electrónico válida."
    );
    expect(es.editProfile.invalidEmail).toBe(
      "Introduce una dirección de correo electrónico válida."
    );
    expect(es.editProfile.errorPhoneInvalid).toBe("Introduce un número de teléfono válido.");
    expect(es.editProfile.invalidPhone).toBe("Introduce un número de teléfono válido.");
    expect(es.editProfile.phonePendingVerificationNotice).toBe(
      "Los cambios de teléfono requieren verificación. La verificación por SMS no está conectada en esta demostración de frontend."
    );
    expect(es.editProfile.pendingPhone).toBe(
      "Los cambios de teléfono requieren verificación. La verificación por SMS no está conectada en esta demostración de frontend."
    );
    expect(es.editProfile.savedLocallyNotice).toBe(
      "Guardado localmente para la vista previa del frontend."
    );
    expect(es.editProfile.savedLocally).toBe(
      "Guardado localmente para la vista previa del frontend."
    );
    expect(es.editProfile.noChangesNotice).toBe("No hay cambios para guardar.");
    expect(es.editProfile.noChanges).toBe("No hay cambios para guardar.");
    expect(es.editProfile.restoreOriginalPhone).toBe("Restaurar el teléfono original");
    expect(es.editProfile.restorePhone).toBe("Restaurar el teléfono original");
    expect(es.editProfile.cancelDiscardChanges).toBe("¿Descartar los cambios sin guardar?");
    expect(es.editProfile.unsavedChanges).toBe("¿Descartar los cambios sin guardar?");
    expect(es.editProfile.discardChanges).toBe("Descartar cambios");
    expect(es.editProfile.keepEditing).toBe("Seguir editando");
  });

  it("verifies exact C09 English strings from Figma node 331:118", () => {
    expect(en.socialReturn.brandTagline).toBe("WE HAUL IT ALL.");
    expect(en.socialReturn.title).toBe("Account connected.");
    expect(en.socialReturn.subtitle).toBe(
      "The provider completed sign-in for this fictional HAULIX demo profile."
    );
    expect(en.socialReturn.availability).toBe("PHOENIX, ARIZONA  •  HAULIX CUSTOMER");
    expect(en.socialReturn.providerStatus).toBe("Google sign-in returned successfully");
    expect(en.socialReturn.demoName).toBe("Sarah Mitchell");
    expect(en.socialReturn.demoEmail).toBe("sarah.mitchell@example.test");
    expect(en.socialReturn.explanation).toBe(
      "Your existing customer records are available after secure account matching."
    );
    expect(en.socialReturn.primaryAction).toBe("Go to My Account");
    expect(en.socialReturn.secondaryAction).toBe("Sign in another way");
    expect(en.socialReturn.demoNotice).toBe("DEMO ONLY • No real authentication or messaging");
  });

  it("verifies exact C09 Spanish strings from Figma node 347:283", () => {
    expect(es.socialReturn.brandTagline).toBe("LO RECOGEMOS TODO.");
    expect(es.socialReturn.title).toBe("Cuenta vinculada.");
    expect(es.socialReturn.subtitle).toBe(
      "El proveedor confirmó el acceso a este perfil de demostración."
    );
    expect(es.socialReturn.availability).toBe("PHOENIX, ARIZONA • CLIENTE HAULIX");
    expect(es.socialReturn.providerStatus).toBe("Acceso con Google correcto");
    expect(es.socialReturn.demoName).toBe("Bryan Lopez");
    expect(es.socialReturn.demoEmail).toBe("bryan.lopez@example.test");
    expect(es.socialReturn.explanation).toBe(
      "Tus reservas estarán disponibles después de validar tu identidad."
    );
    expect(es.socialReturn.primaryAction).toBe("Ir a mi cuenta");
    expect(es.socialReturn.secondaryAction).toBe("Elegir otro acceso");
    expect(es.socialReturn.demoNotice).toBe("SOLO DEMOSTRACIÓN · Sin acceso ni mensajes reales");
  });

  it("verifies exact C08 English Default strings from Figma node 331:75", () => {
    expect(en.brand.tagline).toBe("WE HAUL IT ALL.");
    expect(en.verifyPhone.title).toBe("Verify your number.");
    expect(en.verifyPhone.subtitle).toBe(
      "Enter the one-time code sent to the registered demo number."
    );
    expect(en.verifyPhone.availability).toBe("PHOENIX, ARIZONA  •  HAULIX CUSTOMER");
    expect(en.verifyPhone.defaultPhone).toBe("+1 602-555-0142");
    expect(en.verifyPhone.codeExpires).toBe(
      "Code expires after the verification window. Never share this code."
    );
    expect(en.verifyPhone.resendTitle).toBe("Did not receive a code?");
    expect(en.verifyPhone.resendSubtitle).toBe("Resend available after cooldown");
    expect(en.verifyPhone.verifyButton).toBe("Verify & Continue");
    expect(en.verifyPhone.changeNumberButton).toBe("Change phone number");
    expect(en.verifyPhone.demoNotice).toBe("DEMO ONLY • No real authentication or messaging");
    expect(en.verifyPhone.emptyCodeError).toBe("Please enter the verification code");
    expect(en.verifyPhone.incompleteCodeError).toBe(
      "Please enter the complete 6-digit verification code"
    );
    expect(en.verifyPhone.invalidCharsError).toBe(
      "Only numeric digits are allowed in the verification code"
    );
  });

  it("verifies exact C08 Spanish translation strings from Figma node 347:179", () => {
    expect(es.brand.tagline).toBe("LO RECOGEMOS TODO.");
    expect(es.verifyPhone.title).toBe("Verifica tu número.");
    expect(es.verifyPhone.subtitle).toBe(
      "Introduce el código enviado al número registrado en este ejemplo."
    );
    expect(es.verifyPhone.availability).toBe("PHOENIX, ARIZONA • CLIENTE HAULIX");
    expect(es.verifyPhone.defaultPhone).toBe("+1 602-555-0142");
    expect(es.verifyPhone.codeExpires).toBe("El código caduca. No lo compartas con nadie.");
    expect(es.verifyPhone.resendTitle).toBe("¿No recibiste el código?");
    expect(es.verifyPhone.resendSubtitle).toBe(
      "Puedes solicitar otro código al finalizar la espera."
    );
    expect(es.verifyPhone.verifyButton).toBe("Verificar y continuar");
    expect(es.verifyPhone.changeNumberButton).toBe("Cambiar número");
    expect(es.verifyPhone.demoNotice).toBe("SOLO DEMOSTRACIÓN · Sin acceso ni mensajes reales");
    expect(es.verifyPhone.emptyCodeError).toBe("Por favor, introduce el código de verificación");
    expect(es.verifyPhone.incompleteCodeError).toBe(
      "Por favor, introduce el código de verificación completo de 6 dígitos"
    );
    expect(es.verifyPhone.invalidCharsError).toBe(
      "Solo se permiten dígitos numéricos en el código de verificación"
    );
  });

  it("verifies exact Spanish translation strings from Figma node 347:86", () => {
    expect(es.brand.tagline).toBe("LO RECOGEMOS TODO.");
    expect(es.signIn.title).toBe("¡Bienvenido de nuevo!");
    expect(es.signIn.subtitle).toBe("Inicia sesión para gestionar tus reservas HAULIX en Arizona.");
    expect(es.signIn.availability).toBe("PHOENIX, ARIZONA  •  CLIENTE HAULIX");
    expect(es.signIn.emailLabel).toBe("CORREO ELECTRÓNICO");
    expect(es.signIn.passwordLabel).toBe("CONTRASEÑA");
    expect(es.signIn.credentialsHint).toBe("Accede de forma segura a tu cuenta HAULIX.");
    expect(es.signIn.forgotPassword).toBe("¿Olvidaste tu contraseña?");
    expect(es.signIn.submit).toBe("Iniciar sesión");
    expect(es.signIn.phoneCode).toBe("Usar código telefónico");
    expect(es.signIn.orProvider).toBe("O CONTINÚA CON");
    expect(es.signIn.apple).toBe("Continuar con Apple");
    expect(es.signIn.google).toBe("Continuar con Google");
    expect(es.signIn.switchLanguage).toBe("🌐 Inglés  ·  Cambiar idioma");
    expect(es.signIn.createAccountPrompt).toBe("¿No tienes cuenta? ");
    expect(es.signIn.createAccountAction).toBe("Crear cuenta");
  });

  it("verifies exact Spanish translation strings from Figma node 347:130 (visible namespace 695:*)", () => {
    expect(es.brand.tagline).toBe("LO RECOGEMOS TODO.");
    expect(es.createAccount.step1).toBe("1  DATOS DE CUENTA");
    expect(es.createAccount.step2).toBe("2  VERIFICAR TELÉFONO");
    expect(es.createAccount.title).toBe("Tu servicio empieza aquí.");
    expect(es.createAccount.subtitle).toBe(
      "Crea tu cuenta para gestionar reservas, recibos y tu historial de servicios."
    );
    expect(es.createAccount.availability).toBe("PHOENIX, ARIZONA  •  CLIENTE HAULIX");
    expect(es.createAccount.nameLabel).toBe("NOMBRE COMPLETO");
    expect(es.createAccount.namePlaceholder).toBe("Bryan Lopez");
    expect(es.createAccount.emailLabel).toBe("CORREO ELECTRÓNICO");
    expect(es.createAccount.emailPlaceholder).toBe("bryan.lopez@example.test");
    expect(es.createAccount.phoneLabel).toBe("NÚMERO DE TELÉFONO");
    expect(es.createAccount.phonePlaceholder).toBe("+1 602-555-0142");
    expect(es.createAccount.passwordLabel).toBe("CONTRASEÑA");
    expect(es.createAccount.passwordPlaceholder).toBe("Introduce una contraseña segura");
    expect(es.createAccount.passwordGuidance).toBe(
      "Elige una contraseña segura. Los requisitos se verifican al continuar."
    );
    expect(es.createAccount.consentPrefix).toBe("He leído lo siguiente:");
    expect(es.createAccount.terms).toBe("Términos");
    expect(es.createAccount.privacyPolicy).toBe("Política de privacidad");
    expect(es.createAccount.nextStepHint).toBe(
      "Siguiente: verifica tu teléfono para completar el registro."
    );
    expect(es.createAccount.submit).toBe("Crear cuenta");
    expect(es.createAccount.alreadyHaveAccount).toBe("¿Ya tienes cuenta? Iniciar sesión");
    expect(es.createAccount.orProvider).toBe("O CONTINÚA CON");
    expect(es.createAccount.apple).toBe("Continuar con Apple");
    expect(es.createAccount.google).toBe("Continuar con Google");
    expect(es.createAccount.switchLanguage).toBe("🌐 Inglés  ·  Cambiar idioma");
  });

  it("switches locale dynamically between English and Spanish 5 times without degradation", async () => {
    for (let i = 0; i < 5; i++) {
      await changeLocale("es");
      expect(getCurrentLocale()).toBe("es");
      expect(i18next.t("createAccount.title")).toBe("Tu servicio empieza aquí.");
      expect(i18next.t("createAccount.submit")).toBe("Crear cuenta");
      expect(i18next.t("verifyPhone.title")).toBe("Verifica tu número.");
      expect(i18next.t("verifyPhone.verifyButton")).toBe("Verificar y continuar");
      expect(i18next.t("verifyPhone.changeNumberButton")).toBe("Cambiar número");

      await changeLocale("en");
      expect(getCurrentLocale()).toBe("en");
      expect(i18next.t("createAccount.title")).toBe("Your next haul starts here.");
      expect(i18next.t("createAccount.submit")).toBe("Create Account");
      expect(i18next.t("verifyPhone.title")).toBe("Verify your number.");
      expect(i18next.t("verifyPhone.verifyButton")).toBe("Verify & Continue");
      expect(i18next.t("verifyPhone.changeNumberButton")).toBe("Change phone number");
    }
  });

  it("switches locale dynamically between English and Spanish", async () => {
    await changeLocale("es");
    expect(getCurrentLocale()).toBe("es");
    expect(i18next.t("signIn.title")).toBe("¡Bienvenido de nuevo!");
    expect(i18next.t("brand.tagline")).toBe("LO RECOGEMOS TODO.");

    await changeLocale("en");
    expect(getCurrentLocale()).toBe("en");
    expect(i18next.t("signIn.title")).toBe("Welcome back.");
    expect(i18next.t("brand.tagline")).toBe("WE HAUL IT ALL.");
  });
});
