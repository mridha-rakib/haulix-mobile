# HAULIX Customer Mobile App — Phase 03.42

## Complete Machine-Audited Customer Screen Inventory

**Audit Date:** 2026-11-21  
**Total Canonical Screen Routes:** 104 (103 core screens + 1 entry root)  
**Total Route Files in Repository:** 106  
**Total Localized Navigator Variants:** 207  
**Verification Method:** Static filesystem analysis and AST parsing

---

### Workflow Breakdown Summary

| Workflow ID       | Workflow Name                                   | Canonical Screens | Localized Variants | Route Directory                        | Status           |
| :---------------- | :---------------------------------------------- | :---------------: | :----------------: | :------------------------------------- | :--------------- |
| **W01**           | Account, Authentication & Entry                 |        14         |         28         | `apps/customer/app/(auth)/` & `(app)/` | VERIFIED         |
| **W02**           | Service Discovery & Inventory Intake            |        42         |         84         | `apps/customer/app/(app)/`             | VERIFIED         |
| **W03**           | AI Recognition, Quote & Scope Acceptance        |        24         |         48         | `apps/customer/app/(app)/`             | VERIFIED         |
| **W04**           | Scheduling, Payment Recovery & Booking Outcomes |        23         |         46         | `apps/customer/app/(app)/`             | VERIFIED         |
| **Root/Scaffold** | Root redirect & dev styling preview             |         1         |         1          | `apps/customer/app/`                   | VERIFIED         |
| **Total**         | **Customer App Complete Inventory**             |      **104**      |      **207**       | —                                      | **100% AUDITED** |

---

### Detailed Screen-by-Screen Master Inventory

#### Workflow 01: Account, Authentication & Customer Entry (14 Canonical Screens)

| Screen ID | Canonical Title (EN / ES)                        | Figma Node | Route Path              | File Path                                          | Bottom Nav |
| :-------- | :----------------------------------------------- | :--------- | :---------------------- | :------------------------------------------------- | :--------: |
| **C01**   | Home & Services / Inicio y Servicios             | `439:3498` | `/(app)` (or `/`)       | `apps/customer/app/(app)/index.tsx`                |    YES     |
| **C06**   | Email Sign-in / Iniciar sesión con correo        | `331:26`   | `/sign-in`              | `apps/customer/app/(auth)/sign-in.tsx`             |     NO     |
| **C07**   | Create Account / Crear cuenta                    | `331:75`   | `/create-account`       | `apps/customer/app/(auth)/create-account.tsx`      |     NO     |
| **C08**   | Verify Phone / Verificar teléfono                | `331:118`  | `/verify-phone`         | `apps/customer/app/(auth)/verify-phone.tsx`        |     NO     |
| **C09**   | Social Account Return / Retorno de cuenta social | `331:160`  | `/social-return`        | `apps/customer/app/(auth)/social-return.tsx`       |     NO     |
| **C10**   | Customer Account / Cuenta de cliente             | `333:26`   | `/account`              | `apps/customer/app/(app)/account.tsx`              |    YES     |
| **C10-E** | Edit Profile / Editar perfil                     | `333:116`  | `/edit-profile`         | `apps/customer/app/(app)/edit-profile.tsx`         |    YES     |
| **C10-S** | Profile Updated / Perfil actualizado             | `333:171`  | `/profile-updated`      | `apps/customer/app/(app)/profile-updated.tsx`      |    YES     |
| **C15**   | Service Discovery / Descubrimiento de servicios  | `382:126`  | `/service-discovery`    | `apps/customer/app/(app)/service-discovery.tsx`    |     NO     |
| **C15-S** | Service Selected / Servicio seleccionado         | `382:241`  | `/service-selected`     | `apps/customer/app/(app)/service-selected.tsx`     |     NO     |
| **C16**   | Service Area Check / Área de servicio            | `382:323`  | `/service-area`         | `apps/customer/app/(app)/service-area.tsx`         |     NO     |
| **C16-F** | Service Restrictions / Restricciones de servicio | `382:420`  | `/service-restrictions` | `apps/customer/app/(app)/service-restrictions.tsx` |     NO     |
| **C17**   | Pickup Address / Dirección de recogida           | `382:576`  | `/pickup-address`       | `apps/customer/app/(app)/pickup-address.tsx`       |     NO     |
| **C17-A** | Add Pickup Address / Agregar dirección           | `382:645`  | `/add-pickup-address`   | `apps/customer/app/(app)/add-pickup-address.tsx`   |     NO     |

#### Workflow 02: Intake & Inventory Verification (42 Canonical Screens)

| Screen ID    | Canonical Title (EN / ES)                               | Figma Node | Route Path                     | File Path                                                 | Bottom Nav |
| :----------- | :------------------------------------------------------ | :--------- | :----------------------------- | :-------------------------------------------------------- | :--------: |
| **C17-V**    | Address Validation Error / Error de validación          | `382:708`  | `/pickup-address-validation`   | `apps/customer/app/(app)/pickup-address-validation.tsx`   |     NO     |
| **C17-D**    | Moving Destination / Destino de mudanza                 | `382:744`  | `/moving-destination`          | `apps/customer/app/(app)/moving-destination.tsx`          |     NO     |
| **C18-M**    | Moving Intake Details / Detalles de mudanza             | `382:881`  | `/moving-intake`               | `apps/customer/app/(app)/moving-intake.tsx`               |     NO     |
| **C18-J**    | Junk Removal Intake / Retiro de escombros               | `382:940`  | `/junk-intake`                 | `apps/customer/app/(app)/junk-intake.tsx`                 |     NO     |
| **C18-B**    | Bulky Items Intake / Artículos voluminosos              | `382:990`  | `/bulky-item-intake`           | `apps/customer/app/(app)/bulky-item-intake.tsx`           |     NO     |
| **C18-G**    | Garage Cleanout Intake / Limpieza de garaje             | `382:1040` | `/garage-intake`               | `apps/customer/app/(app)/garage-intake.tsx`               |     NO     |
| **C18-A**    | Appliance Intake / Retiro de electrodomésticos          | `382:1090` | `/appliance-intake`            | `apps/customer/app/(app)/appliance-intake.tsx`            |     NO     |
| **C18-MAT**  | Mattress Intake / Retiro de colchones                   | `382:1140` | `/mattress-intake`             | `apps/customer/app/(app)/mattress-intake.tsx`             |     NO     |
| **C18-RET**  | Retail Pickup Intake / Recogida en tienda               | `382:1190` | `/retail-intake`               | `apps/customer/app/(app)/retail-intake.tsx`               |     NO     |
| **C18-MA**   | Moving Access Details / Acceso de mudanza               | `382:1240` | `/moving-access`               | `apps/customer/app/(app)/moving-access.tsx`               |     NO     |
| **C18-RMR**  | Retail Readiness Review / Preparación de tienda         | `382:1290` | `/retail-collection-readiness` | `apps/customer/app/(app)/retail-collection-readiness.tsx` |     NO     |
| **C18-ROM**  | Retail Order Missing / Falta orden comercial            | `382:1340` | `/retail-order-missing`        | `apps/customer/app/(app)/retail-order-missing.tsx`        |     NO     |
| **C18-EXH**  | Extra Access Help / Ayuda de acceso adicional           | `382:1390` | `/extra-access-help`           | `apps/customer/app/(app)/extra-access-help.tsx`           |     NO     |
| **C18-VAL**  | Access Validation / Validación de acceso                | `382:1440` | `/access-validation`           | `apps/customer/app/(app)/access-validation.tsx`           |     NO     |
| **C18-ACC**  | Access Details Summary / Resumen de acceso              | `382:1490` | `/access-details`              | `apps/customer/app/(app)/access-details.tsx`              |     NO     |
| **C19**      | Item Inventory / Inventario de artículos                | `382:1540` | `/item-inventory`              | `apps/customer/app/(app)/item-inventory.tsx`              |     NO     |
| **C19-A**    | Add Inventory Item / Agregar artículo                   | `382:1590` | `/add-inventory-item`          | `apps/customer/app/(app)/add-inventory-item.tsx`          |     NO     |
| **C19-E**    | Edit Inventory Item / Editar artículo                   | `382:1640` | `/edit-inventory-item`         | `apps/customer/app/(app)/edit-inventory-item.tsx`         |     NO     |
| **C19-V**    | Inventory Validation / Validación de inventario         | `382:1690` | `/inventory-validation`        | `apps/customer/app/(app)/inventory-validation.tsx`        |     NO     |
| **C19-R**    | Restricted Material / Material restringido              | `382:1740` | `/restricted-material`         | `apps/customer/app/(app)/restricted-material.tsx`         |     NO     |
| **C20**      | Item Photos / Fotos de artículos                        | `382:1790` | `/item-photos`                 | `apps/customer/app/(app)/item-photos.tsx`                 |     NO     |
| **C20-E**    | Item Photos Empty / Sin fotos                           | `382:1840` | `/item-photos-empty`           | `apps/customer/app/(app)/item-photos-empty.tsx`           |     NO     |
| **C20-F**    | Photo Upload Failed / Error de carga                    | `382:1890` | `/photo-upload-failed`         | `apps/customer/app/(app)/photo-upload-failed.tsx`         |     NO     |
| **C20-R**    | Replace Item Photo / Reemplazar foto                    | `382:1940` | `/replace-item-photo`          | `apps/customer/app/(app)/replace-item-photo.tsx`          |     NO     |
| **C20-M**    | Manual Item Verification / Verificación manual          | `382:1990` | `/manual-item-verification`    | `apps/customer/app/(app)/manual-item-verification.tsx`    |     NO     |
| **C21-M**    | Moving Intake Review / Revisión de mudanza              | `382:2040` | `/moving-intake-review`        | `apps/customer/app/(app)/moving-intake-review.tsx`        |     NO     |
| **C21-F**    | Furniture Intake Review / Revisión de muebles           | `382:2090` | `/furniture-intake-review`     | `apps/customer/app/(app)/furniture-intake-review.tsx`     |     NO     |
| **C21-G**    | Garage Intake Review / Revisión de garaje               | `382:2140` | `/garage-intake-review`        | `apps/customer/app/(app)/garage-intake-review.tsx`        |     NO     |
| **C21-A**    | Appliance Intake Review / Revisión de electrodomésticos | `382:2190` | `/appliance-intake-review`     | `apps/customer/app/(app)/appliance-intake-review.tsx`     |     NO     |
| **C21-MAT**  | Mattress Intake Review / Revisión de colchones          | `382:2240` | `/mattress-intake-review`      | `apps/customer/app/(app)/mattress-intake-review.tsx`      |     NO     |
| **C21-RET**  | Retail Intake Review / Revisión de tienda               | `382:2290` | `/retail-intake-review`        | `apps/customer/app/(app)/retail-intake-review.tsx`        |     NO     |
| **C21-REV**  | Intake Review Summary / Resumen de revisión             | `382:2340` | `/intake-review`               | `apps/customer/app/(app)/intake-review.tsx`               |     NO     |
| **C21-SAV**  | Intake Draft Saved / Borrador guardado                  | `382:2390` | `/intake-draft-saved`          | `apps/customer/app/(app)/intake-draft-saved.tsx`          |     NO     |
| **C21-BLK**  | Intake Review Blocked / Revisión bloqueada              | `382:2440` | `/intake-review-blocked`       | `apps/customer/app/(app)/intake-review-blocked.tsx`       |     NO     |
| **C21-AI-M** | Moving AI Handoff / Traspaso IA mudanza                 | `382:2490` | `/moving-ai-handoff`           | `apps/customer/app/(app)/moving-ai-handoff.tsx`           |     NO     |
| **C21-AI-F** | Furniture AI Handoff / Traspaso IA muebles              | `382:2540` | `/furniture-ai-handoff`        | `apps/customer/app/(app)/furniture-ai-handoff.tsx`        |     NO     |
| **C21-AI-G** | Garage AI Handoff / Traspaso IA garaje                  | `382:2590` | `/garage-ai-handoff`           | `apps/customer/app/(app)/garage-ai-handoff.tsx`           |     NO     |
| **C21-AI-A** | Appliance AI Handoff / Traspaso IA electrodomésticos    | `382:2640` | `/appliance-ai-handoff`        | `apps/customer/app/(app)/appliance-ai-handoff.tsx`        |     NO     |
| **C21-AI-T** | Mattress AI Handoff / Traspaso IA colchones             | `382:2690` | `/mattress-ai-handoff`         | `apps/customer/app/(app)/mattress-ai-handoff.tsx`         |     NO     |
| **C21-AI-R** | Retail AI Handoff / Traspaso IA tienda                  | `382:2740` | `/retail-ai-handoff`           | `apps/customer/app/(app)/retail-ai-handoff.tsx`           |     NO     |
| **C21-AI-H** | AI Review Handoff / Traspaso general IA                 | `382:2790` | `/ai-review-handoff`           | `apps/customer/app/(app)/ai-review-handoff.tsx`           |     NO     |
| **C22-P**    | AI Processing / Procesamiento IA                        | `382:2840` | `/ai-processing`               | `apps/customer/app/(app)/ai-processing.tsx`               |     NO     |

#### Workflow 03: AI Recognition, Quote & Scope Acceptance (24 Canonical Screens)

| Screen ID   | Canonical Title (EN / ES)                             | Figma Node | Route Path                       | File Path                                                   | Bottom Nav |
| :---------- | :---------------------------------------------------- | :--------- | :------------------------------- | :---------------------------------------------------------- | :--------: |
| **C22-REC** | AI Recognition Results / Resultados IA                | `382:2890` | `/ai-recognition`                | `apps/customer/app/(app)/ai-recognition.tsx`                |     NO     |
| **C22-UNC** | AI Uncertain Result / Resultado incierto IA           | `382:2940` | `/ai-uncertain-result`           | `apps/customer/app/(app)/ai-uncertain-result.tsx`           |     NO     |
| **C22-MIS** | AI Missing Photos / Fotos faltantes IA                | `382:2990` | `/ai-missing-photos`             | `apps/customer/app/(app)/ai-missing-photos.tsx`             |     NO     |
| **C22-FAI** | AI Recognition Failed / Falla de IA                   | `382:3040` | `/ai-recognition-failed`         | `apps/customer/app/(app)/ai-recognition-failed.tsx`         |     NO     |
| **C22-OFF** | AI Offline Recovery / Recuperación offline IA         | `382:3090` | `/ai-offline-recovery`           | `apps/customer/app/(app)/ai-offline-recovery.tsx`           |     NO     |
| **C22-REJ** | Rejected AI Identification / Rechazo de IA            | `382:3140` | `/rejected-ai-identification`    | `apps/customer/app/(app)/rejected-ai-identification.tsx`    |     NO     |
| **C22-SUG** | AI Suggested Items / Artículos sugeridos IA           | `382:3190` | `/ai-suggested-items`            | `apps/customer/app/(app)/ai-suggested-items.tsx`            |     NO     |
| **C22-VER** | Verify Suggested Inventory / Verificar sugerencias    | `382:3240` | `/verify-suggested-inventory`    | `apps/customer/app/(app)/verify-suggested-inventory.tsx`    |     NO     |
| **C22-COR** | Correct AI Items / Corregir artículos IA              | `382:3290` | `/correct-ai-items`              | `apps/customer/app/(app)/correct-ai-items.tsx`              |     NO     |
| **C22-MEA** | Measurement Clarification / Aclaración de medidas     | `382:3340` | `/measurement-clarification`     | `apps/customer/app/(app)/measurement-clarification.tsx`     |     NO     |
| **C23**     | Customer Confirmed Items / Artículos confirmados      | `382:3390` | `/customer-confirmed-items`      | `apps/customer/app/(app)/customer-confirmed-items.tsx`      |     NO     |
| **C23-ADM** | Admin Review Pending / Revisión de admin pendiente    | `382:3440` | `/admin-review-pending`          | `apps/customer/app/(app)/admin-review-pending.tsx`          |     NO     |
| **C23-CLA** | Admin Clarification Requested / Aclaración solicitada | `382:3490` | `/admin-clarification-requested` | `apps/customer/app/(app)/admin-clarification-requested.tsx` |     NO     |
| **C23-RES** | Admin Review Resolved / Revisión resuelta             | `382:3540` | `/admin-review-resolved`         | `apps/customer/app/(app)/admin-review-resolved.tsx`         |     NO     |
| **C24-P**   | Quote Processing / Procesamiento de cotización        | `382:3590` | `/quote-processing`              | `apps/customer/app/(app)/quote-processing.tsx`              |     NO     |
| **C24-Q**   | Illustrative Quote / Cotización ilustrativa           | `382:3640` | `/illustrative-quote`            | `apps/customer/app/(app)/illustrative-quote.tsx`            |     NO     |
| **C24-F**   | Quote Error Recovery / Recuperación de cotización     | `382:3690` | `/quote-error-recovery`          | `apps/customer/app/(app)/quote-error-recovery.tsx`          |     NO     |
| **C24-REV** | Quote Revision / Revisión de cotización               | `382:3740` | `/quote-revision`                | `apps/customer/app/(app)/quote-revision.tsx`                |     NO     |
| **C25**     | Itemized Quote & Terms / Cotización desglosada        | `382:3790` | `/itemized-quote`                | `apps/customer/app/(app)/itemized-quote.tsx`                |     NO     |
| **C25-X**   | Quote Expired / Cotización vencida                    | `382:3840` | `/quote-expired`                 | `apps/customer/app/(app)/quote-expired.tsx`                 |     NO     |
| **C25-A**   | Quote Acceptance Review / Aceptación de cotización    | `382:3890` | `/quote-acceptance-review`       | `apps/customer/app/(app)/quote-acceptance-review.tsx`       |     NO     |
| **C25-E**   | Unapproved Rate Rules / Reglas de tarifa no aprobada  | `382:3940` | `/unapproved-rate-rules`         | `apps/customer/app/(app)/unapproved-rate-rules.tsx`         |     NO     |
| **C26-A**   | Scope Accepted / Alcance aceptado                     | `382:3990` | `/scope-accepted`                | `apps/customer/app/(app)/scope-accepted.tsx`                |     NO     |
| **C26-R**   | Scope Acceptance Recovery / Recuperación de alcance   | `382:4040` | `/scope-acceptance-recovery`     | `apps/customer/app/(app)/scope-acceptance-recovery.tsx`     |     NO     |

#### Workflow 04: Scheduling, Payment Recovery & Booking Outcomes (23 Canonical Screens)

| Screen ID  | Canonical Title (EN / ES)                                              | Figma Node | Route Path                         | File Path                                                     | Bottom Nav |
| :--------- | :--------------------------------------------------------------------- | :--------- | :--------------------------------- | :------------------------------------------------------------ | :--------: |
| **C27**    | Choose Service Time / Elegir horario de servicio                       | `763:2`    | `/choose-service-time`             | `apps/customer/app/(app)/choose-service-time.tsx`             |     NO     |
| **C27-S**  | Select Available Window / Seleccionar franja                           | `763:133`  | `/select-available-window`         | `apps/customer/app/(app)/select-available-window.tsx`         |     NO     |
| **C27-A**  | Request Service ASAP / Solicitar servicio cuanto antes                 | `763:71`   | `/request-service-asap`            | `apps/customer/app/(app)/request-service-asap.tsx`            |     NO     |
| **C27-V**  | Invalid Service Time / Horario no válido                               | `763:202`  | `/invalid-service-time`            | `apps/customer/app/(app)/invalid-service-time.tsx`            |     NO     |
| **C27-R**  | Service Window Unavailable / Franja no disponible                      | `763:269`  | `/service-window-unavailable`      | `apps/customer/app/(app)/service-window-unavailable.tsx`      |     NO     |
| **C27-N**  | No Eligible Driver In Area / Sin conductor disponible                  | `763:336`  | `/no-eligible-driver`              | `apps/customer/app/(app)/no-eligible-driver.tsx`              |     NO     |
| **C27-X**  | No-Driver Fee-Free Cancellation / Cancelación sin tarifa               | `763:366`  | `/no-driver-fee-free-cancellation` | `apps/customer/app/(app)/no-driver-fee-free-cancellation.tsx` |     NO     |
| **C28**    | Review Booking Details / Revisar reserva                               | `763:396`  | `/review-booking`                  | `apps/customer/app/(app)/review-booking.tsx`                  |     NO     |
| **C28-C**  | Booking Terms Accepted / Términos aceptados                            | `763:467`  | `/booking-terms-accepted`          | `apps/customer/app/(app)/booking-terms-accepted.tsx`          |     NO     |
| **C28-U**  | Booking Terms Changed / Términos modificados                           | `763:537`  | `/booking-terms-changed`           | `apps/customer/app/(app)/booking-terms-changed.tsx`           |     NO     |
| **C29**    | Choose Payment Method / Elegir método de pago                          | `763:607`  | `/choose-payment-method`           | `apps/customer/app/(app)/choose-payment-method.tsx`           |     NO     |
| **C29-M**  | Secure Card Setup / Configuración segura de tarjeta                    | `763:677`  | `/secure-card-setup`               | `apps/customer/app/(app)/secure-card-setup.tsx`               |     NO     |
| **C29-3D** | Confirm Card Authentication / Autenticación de tarjeta                 | `763:747`  | `/confirm-card-authentication`     | `apps/customer/app/(app)/confirm-card-authentication.tsx`     |     NO     |
| **C29-P**  | Payment Authorization Pending / Autorización pendiente                 | `763:817`  | `/payment-authorization-pending`   | `apps/customer/app/(app)/payment-authorization-pending.tsx`   |     NO     |
| **C30-D**  | Payment Authorization Declined / Autorización rechazada                | `763:887`  | `/payment-authorization-declined`  | `apps/customer/app/(app)/payment-authorization-declined.tsx`  |     NO     |
| **C30-E**  | Card Hold Expired / Retención de tarjeta vencida                       | `763:917`  | `/card-hold-expired`               | `apps/customer/app/(app)/card-hold-expired.tsx`               |     NO     |
| **C30-R**  | Restore Secure Authorization / Restablecer autorización                | `763:952`  | `/restore-secure-authorization`    | `apps/customer/app/(app)/restore-secure-authorization.tsx`    |     NO     |
| **C30-C**  | Review a Fresh Card Hold / Revisar nueva retención                     | `773:836`  | `/review-fresh-card-hold`          | `apps/customer/app/(app)/review-fresh-card-hold.tsx`          |     NO     |
| **C30-CA** | New Authorization Consent / Consentimiento registrado                  | `773:905`  | `/new-authorization-consent`       | `apps/customer/app/(app)/new-authorization-consent.tsx`       |     NO     |
| **C31-P**  | Checking Booking Status / Verificando estado                           | `763:1021` | `/checking-booking-status`         | `apps/customer/app/(app)/checking-booking-status.tsx`         |     NO     |
| **C31-S**  | Your Booking Is Recorded / Tu reserva está registrada                  | `763:1089` | `/booking-recorded`                | `apps/customer/app/(app)/booking-recorded.tsx`                |     NO     |
| **C31-A**  | Your ASAP Request Is Recorded / Tu solicitud inmediata está registrada | `763:1155` | `/asap-request-recorded`           | `apps/customer/app/(app)/asap-request-recorded.tsx`           |     NO     |
| **C31-F**  | Booking Not Yet Confirmed / Reserva aún no confirmada                  | `763:1221` | `/booking-not-confirmed`           | `apps/customer/app/(app)/booking-not-confirmed.tsx`           |     NO     |

#### Root / Scaffold Routes (2 Files)

| File Name             | Route Path         | Purpose                                                         |
| :-------------------- | :----------------- | :-------------------------------------------------------------- |
| `index.tsx`           | `/`                | Redirects to `/(auth)/sign-in` or initial entry point           |
| `styling-preview.tsx` | `/styling-preview` | Internal `__DEV__` typography and design token preview scaffold |
