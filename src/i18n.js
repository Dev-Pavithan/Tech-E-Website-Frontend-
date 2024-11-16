// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "Admin Settings": "Admin Settings",
          "Change Profile Name": "Change Profile Name",
          "New Name": "New Name",
          "Update": "Update",
          "Update Password": "Update Password",
          "Current Password": "Current Password",
          "New Password": "New Password",
          "Delete Account": "Delete Account",
          "Password for Confirmation": "Password for Confirmation",
          "Language": "Language",
          "Upload": "Upload",
          "Remove Image": "Remove Image",
          "Dashboard": "Dashboard",
          "Total Users": "Total Users",
          "Total Messages": "Total Messages",
          "Available Packages": "Available Packages",
          "Total Income": "Total Income",
          "Recent Transactions": "Recent Transactions",
          "Recent Messages": "Recent Messages",
        }
      },
      ta: {
        translation: {
          "Admin Settings": "நிர்வாக அமைப்புகள்",
          "Change Profile Name": "சேவகர் பெயரை மாற்றவும்",
          "New Name": "புதிய பெயர்",
          "Update": "புதுப்பிக்கவும்",
          "Update Password": "பதவிப்பெண் புதுப்பிக்கவும்",
          "Current Password": "தற்போதைய கடவுச்சொல்",
          "New Password": "புதிய கடவுச்சொல்",
          "Delete Account": "கணக்கை நீக்கு",
          "Password for Confirmation": "உறுதிப்படுத்தல் எதற்காக கடவுச்சொல்",
          "Language": "மொழி",
          "Upload": "போக்குவரத்து",
          "Remove Image": "படத்தை அகற்று",
          "Dashboard": "டாஷ்போர்டு",
          "Manage Users": "பயனாளர்களைப் நிர்வகிக்கவும்",
          "Manage Messages": "செய்திகளை நிர்வகிக்கவும்",
          "Manage Packages": "பேக்கேஜ்களை நிர்வகிக்கவும்",
          "Payment Details": "பணம் செலுத்தும் விவரங்கள்",
          "Avatars Model": "படத்தை உருவாக்கும் மாதிரி",
          "Settings": "அமைப்புகள்",
          "Error Updating Name": "உங்கள் பெயரை புதுப்பிக்க தோல்வியாயிற்று.",
          "Error Updating Password": "உங்கள் கடவுச்சொல்லை புதுப்பிக்க தோல்வியாயிற்று.",
          "Error Deleting Account": "உங்கள் கணக்கை நீக்குவதில் பிழை ஏற்பட்டது.",
          "Error Uploading Image": "படத்தை பதிவேற்றுவதில் பிழை ஏற்பட்டது.",
          "Error Removing Image": "படத்தை அகற்றுவதில் பிழை ஏற்பட்டது.",
          "Title": "டெக்-இ நிர்வாகி",
          "Profile": "சேவகர்",
          "Search by Email": "மின்னஞ்சலால் தேடவும்",
          "Search Button": "தேடு",
          "No Messages Found": "செய்திகள் எதுவும் கிடைக்கவில்லை.",
          "Reply": "பதில்",
          "Reply To": "பதில் க்கான",
          "Subject": "தலைப்பு",
          "Message": "செய்தி",
          "Cancel": "ரத்து",
          "Send Reply": "பதில் அனுப்பவும்",
          "Role": "பங்கு",
          "Status": "நிலை",
          "Actions": "செயல்கள்",
          "Block": "தடை",
          "Unblock": "தடை நீக்கு",
          "Active": "செயல்படுகிறேன்",
          "Blocked": "தடையிடப்பட்டது",
          "No Users Found": "பயனாளர்கள் எதுவும் கிடைக்கவில்லை.",
          "Card Holder Name": "கார்டு உள்நுழைவு பெயர்",
          "Amount": "தொகை",
          "Currency": "நாணயம்",
          "Date": "தேதி",
          "Time": "நேரம்",
          "No Payments Found": "பணம் செலுத்தங்கள் எதுவும் கிடைக்கவில்லை.",
          "Create Package": "பேக்கேஜ் உருவாக்கவும்",
          "Edit Package": "பேக்கேஜை தொகுக்கவும்",
          "Add New Package": "புதிய பேக்கேஜ் சேர்க்கவும்",
          "Failed to Fetch Packages": "பேக்கேஜ்களைப் பெற முடியவில்லை.",
          "Failed to Create Package": "பேக்கேஜ் உருவாக்க முடியவில்லை.",
          "Failed to Update Package": "பேக்கேஜ் புதுப்பிக்க முடியவில்லை.",
          "Failed to Delete Package": "பேக்கேஜ் நீக்க முடியவில்லை.",
          "Name": "பெயர்",
          "Version": "மாறுபாடு",
          "Description": "விளக்கம்",
          "Price": "விலை",
          "Images": "படங்கள்",
          "Go Back": "திரும்பு",
          "Add Package": "பேக்கேஜ் சேர்க்கவும்",
          "Update Package": "பேக்கேஜ் புதுப்பிக்கவும்",
          "Available Packages": "கிடைக்கும் பேக்கேஜ்கள்",
          "No Packages Found": "பேக்கேஜ்கள் எதுவும் கிடைக்கவில்லை.",
          "Edit": "தொகுத்து",
          "Disable": "செயலிழக்கவும்",
          "Upload Your Avatar": "உங்கள் படத்தை பதிவேற்றவும்",
          "Email": "மின்னஞ்சல்",
          "Upload Image": "படத்தை பதிவேற்றவும்",
          "Enter Developer Email": "சேவகர் மின்னஞ்சலை உள்ளிடவும்",
          "Check Avatar": "படத்தை சரிபார்க்கவும்",
          "Send Email": "மின்னஞ்சல் அனுப்பவும்",
          "Image uploaded successfully!": "படம் வெற்றிகரமாக பதிவேற்றப்பட்டது!",
          "Failed to upload image": "படத்தை பதிவேற்றுவதில் தோல்வி",
          "No email or image URL found in session storage.": "அணுகுமுறை சேமிப்பில் மின்னஞ்சல் அல்லது பட URL கிடைக்கவில்லை.",
          "Image link sent via email!": "பட இணை மின்னஞ்சல் மூலம் அனுப்பப்பட்டுள்ளது!",
          "No images uploaded yet.": "இன்னும் எந்த படங்களும் பதிவேற்றப்படவில்லை.",
          "Total Users": "மொத்த பயனர்கள்",
          "Total Messages": "மொத்த செய்திகள்",
          "Available Packages": "கிடைக்கும் பக்கேஜ்கள்",
          "Total Income": "மொத்த வருமானம்",
          "Recent Transactions": "சமீபத்திய பரிவர்த்தனைகள்",
          "Recent Messages": "சமீபத்திய செய்திகள்",

        }
      },
      si: {

        translation: {
          "Admin Settings": "පරිපාලක සැකසුම්",
          "Change Profile Name": "පැතිකඩ නම වෙනස් කරන්න",
          "New Name": "නව නම",
          "Update": "යාවත්කාලීන කරන්න",
          "Update Password": "මුරපදය යාවත්කාලීන කරන්න",
          "Current Password": "වත්මන් මුරපදය",
          "New Password": "නව මුරපදය",
          "Delete Account": "ගිණුම මකන්න",
          "Password for Confirmation": "තහවුරු කිරීම සඳහා මුරපදය",
          "Language": "භාෂාව",
          "Upload": "උඩුගත කරන්න",
          "Remove Image": "රූපය ඉවත් කරන්න",
          "Dashboard": " මූල පුවරුව ",
          "Manage Users": "පරිශීලකයින් කළමනාකරණය කරන්න",
          "Manage Messages": "පණිවිඩ කළමනාකරණය කරන්න",
          "Manage Packages": "ඇසුරුම් කළමනාකරණය කරන්න",
          "Payment Details": "ගෙවීම් විස්තර",
          "Avatars Model": "අවතාර ආකෘතිය",
          "Settings": "සැකසුම්",
          "Error Updating Name": "ඔබගේ නම යාවත්කාලීන කිරීමට අසමත් විය.",
          "Error Updating Password": "ඔබගේ මුරපදය යාවත්කාලීන කිරීමට අසමත් විය.",
          "Error Deleting Account": "ඔබගේ ගිණුම මකද්දී දෝෂයක් ඇතිවිය.",
          "Error Uploading Image": "රූපය උඩුගත කිරීමේ දෝෂයක් ඇතිවිය.",
          "Error Removing Image": "රූපය ඉවත් කිරීමේ දෝෂයක් ඇතිවිය.",
          "Title": "ටෙක්-අඩ්මිනිස්ට්‍රේටර්",
          "Profile": "පැතිකඩ",
          "Search by Email": "ඊ-තැපෑලෙන් සෙවීම",
          "Search Button": "සෙවීම",
          "No Messages Found": "කිසිදු පණිවිඩයක් හමු නොවීය.",
          "Reply": "ප්‍රතිචාරය",
          "Reply To": "ප්‍රතිචාරය දෙන්න",
          "Subject": "විෂය",
          "Message": "පණිවිඩය",
          "Cancel": "අවලංගු කරන්න",
          "Send Reply": "ප්‍රතිචාරය යවන්න",
          "Role": "කාර්යභාරය",
          "Status": "තත්ත්වය",
          "Actions": "ක්‍රියාමාර්ග",
          "Block": "ආරක්ෂා කරන්න",
          "Unblock": "ආරක්ෂාව ඉවත් කරන්න",
          "Active": "සක්‍රීය",
          "Blocked": "ආරක්ෂා කරන ලදී",
          "No Users Found": "කිසිදු පරිශීලකයෙකු හමු නොවීය.",
          "Card Holder Name": "කාඩ් හිමියාගේ නම",
          "Amount": "මුදල",
          "Currency": "මුදල් ඒකකය",
          "Date": "දිනය",
          "Time": "වේලාව",
          "No Payments Found": "කිසිදු ගෙවීමක් හමු නොවීය.",
          "Create Package": "ඇසුරුමක් සාදන්න",
          "Edit Package": "ඇසුරුම සංස්කරණය කරන්න",
          "Add New Package": "නව ඇසුරුමක් එක් කරන්න",
          "Failed to Fetch Packages": "ඇසුරුම් ලබා ගැනීමට අසමත් විය.",
          "Failed to Create Package": "ඇසුරුමක් නිර්මාණය කිරීමට අසමත් විය.",
          "Failed to Update Package": "ඇසුරුම යාවත්කාලීන කිරීමට අසමත් විය.",
          "Failed to Delete Package": "ඇසුරුම මැකීමට අසමත් විය.",
          "Name": "නම",
          "Version": "අනුවාදය",
          "Description": "විස්තරය",
          "Price": "මිල",
          "Images": "රූප",
          "Go Back": "ආපසු යන්න",
          "Add Package": "ඇසුරුම එකතු කරන්න",
          "Update Package": "ඇසුරුම යාවත්කාලීන කරන්න",
          "Available Packages": "ලබා ගත හැකි ඇසුරුම්",
          "No Packages Found": "කිසිදු ඇසුරුමක් හමු නොවීය.",
          "Edit": "සංස්කරණය කරන්න",
          "Disable": "අක්‍රිය කරන්න",
          "Upload Your Avatar": "ඔබගේ අවතාරය උඩුගත කරන්න",
          "Email": "ඊ-තැපෑල",
          "Upload Image": "රූපය උඩුගත කරන්න",
          "Enter Developer Email": "සංවර්ධක ඊ-තැපෑල ඇතුල් කරන්න",
          "Check Avatar": "අවතාරය පරීක්ෂා කරන්න",
          "Send Email": "ඊ-තැපෑල යවන්න",
          "Image uploaded successfully!": "රූපය සාර්ථකව උඩුගත කරන ලදී!",
          "Failed to upload image": "රූපය උඩුගත කිරීමට අසමත් විය",
          "No email or image URL found in session storage.": "සැසියෙහි ගබඩා කිරීමේ ඊ-තැපැල් හෝ රූප URL හමු නොවීය.",
          "Image link sent via email!": "රූප සබැඳිය ඊ-තැපෑලෙන් යවන ලදී!",
          "No images uploaded yet.": "මීට පෙර කිසිදු රූපයක් උඩුගත කර නැත.",
          "Total Users": "සමස්ත පරිශීලකයින්",
          "Total Messages": "සමස්ත පණිවිඩ",
          "Available Packages": "ලබා ගත හැකි ඇසුරුම්",
          "Total Income": "සමස්ත ආදායම",
          "Recent Transactions": "මෑත පරිවර්තන",
          "Recent Messages": "මෑත පණිවිඩ"

        }

      },
      es: {
        translation: {
          "Admin Settings": "Configuración de administrador",
          "Change Profile Name": "Cambiar nombre de perfil",
          "New Name": "Nuevo nombre",
          "Update": "Actualizar",
          "Update Password": "Actualizar contraseña",
          "Current Password": "Contraseña actual",
          "New Password": "Nueva contraseña",
          "Delete Account": "Eliminar cuenta",
          "Password for Confirmation": "Contraseña para confirmación",
          "Language": "Idioma",
          "Upload": "Subir",
          "Remove Image": "Eliminar imagen",
          "Dashboard": "Panel de control",
          "Manage Users": "Administrar usuarios",
          "Manage Messages": "Administrar mensajes",
          "Manage Packages": "Administrar paquetes",
          "Payment Details": "Detalles del pago",
          "Avatars Model": "Modelo de avatares",
          "Settings": "Configuraciones",
          "Error Updating Name": "Error al actualizar el nombre.",
          "Error Updating Password": "Error al actualizar la contraseña.",
          "Error Deleting Account": "Error al eliminar la cuenta.",
          "Error Uploading Image": "Error al subir la imagen.",
          "Error Removing Image": "Error al eliminar la imagen.",
          "Title": "Administrador de Tech-I",
          "Profile": "Perfil",
          "Search by Email": "Buscar por correo electrónico",
          "Search Button": "Buscar",
          "No Messages Found": "No se encontraron mensajes.",
          "Reply": "Responder",
          "Reply To": "Responder a",
          "Subject": "Asunto",
          "Message": "Mensaje",
          "Cancel": "Cancelar",
          "Send Reply": "Enviar respuesta",
          "Role": "Rol",
          "Status": "Estado",
          "Actions": "Acciones",
          "Block": "Bloquear",
          "Unblock": "Desbloquear",
          "Active": "Activo",
          "Blocked": "Bloqueado",
          "No Users Found": "No se encontraron usuarios.",
          "Card Holder Name": "Nombre del titular de la tarjeta",
          "Amount": "Cantidad",
          "Currency": "Moneda",
          "Date": "Fecha",
          "Time": "Hora",
          "No Payments Found": "No se encontraron pagos.",
          "Create Package": "Crear paquete",
          "Edit Package": "Editar paquete",
          "Add New Package": "Agregar nuevo paquete",
          "Failed to Fetch Packages": "Error al obtener paquetes.",
          "Failed to Create Package": "Error al crear paquete.",
          "Failed to Update Package": "Error al actualizar paquete.",
          "Failed to Delete Package": "Error al eliminar paquete.",
          "Name": "Nombre",
          "Version": "Versión",
          "Description": "Descripción",
          "Price": "Precio",
          "Images": "Imágenes",
          "Go Back": "Regresar",
          "Add Package": "Agregar paquete",
          "Update Package": "Actualizar paquete",
          "Available Packages": "Paquetes disponibles",
          "No Packages Found": "No se encontraron paquetes.",
          "Edit": "Editar",
          "Disable": "Deshabilitar",
          "Upload Your Avatar": "Sube tu avatar",
          "Email": "Correo electrónico",
          "Upload Image": "Subir imagen",
          "Enter Developer Email": "Introduce el correo electrónico del desarrollador",
          "Check Avatar": "Comprobar avatar",
          "Send Email": "Enviar correo",
          "Image uploaded successfully!": "¡Imagen subida con éxito!",
          "Failed to upload image": "Error al subir la imagen",
          "No email or image URL found in session storage.": "No se encontró correo electrónico o URL de imagen en el almacenamiento de sesión.",
          "Image link sent via email!": "¡Enlace de imagen enviado por correo electrónico!",
          "No images uploaded yet.": "No se han subido imágenes aún.",
          "Total Users": "Usuarios Totales",
          "Total Messages": "Mensajes Totales",
          "Available Packages": "Paquetes Disponibles",
          "Total Income": "Ingreso Total",
          "Recent Transactions": "Transacciones Recientes",
          "Recent Messages": "Mensajes Recientes",

        }
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the selected language is not available
    interpolation: {
      escapeValue: false, // React already protects against XSS
    }
  });

export default i18n;
