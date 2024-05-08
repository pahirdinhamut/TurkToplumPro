const Color = {
  blue: "#0CA0ED",
  PremiumTextColor: "#05063D",
  primary: "#3F3F7D", //"#232660",
  black: "#000000",
  darkgrey: "#AEAEB2",
  lightgrey: "#f5f5f5",
  //blue: "#0077B6",
  grey: "#707070",
  white: "#F5F5F5",
  green: "#06C755",
  bcColor: "#FFFFFF",
  secondaryBcColor: "#F2F2F7",
  lightblue: "#DDF4FE",
  lightBorder: "#E5E5EA",
  error: "#F8312F",
  errorTextColor: "#b02a37", // <- Alert Colors
  successBorderColor: "#28a745",
  errorBorderColor: "#f54e4f",
  errorBackgroundColor: "#f9d7da",
  placeHolder: "#8a8a8a",
  money: "#98FB98"
  //#f5f5f5
};

const TextSize = {
  largeText: "18px", //  User Full name,  header settings navigation text
  mediumText: "16px", // header Text sizes
  normalText: "14px", // info, adv, info, username
  smallText: "12px", // description text size
  xSmallText: "10px", //  button bar navigation text size
  icons: "24px", // normal icon size
  arrowIcon: "18px" // arrow icon size
};

const Fonts = {
  medium: "SFProDisplay-Medium",
  regular: "SFProDisplay-Regular",
  semibold: "SFProDisplay-Semibold"
};

const App = {
  app_id: "74m75U72l6bp74o6fT#70k6cr75u6dt",
  version: "1.1.1",
  base_url: "https://turktoplum.net",
  selected_country: "@selectedCountry",
  theme_options: "@selectedTheme",
  news_nf: "@newsNf",
  filters: "filter_",
  chatrooms: "@chat@",
  lang: "tr",
  nf_token: "@NFToken",
  webClientId: "164572726504-g905fof9i0jo0of6s7rus5cjbq8pgcjo.apps.googleusercontent.com",
  iosClientId: "164572726504-eu0q2nrv4t6sngom5nm7fv34miotpmrv.apps.googleusercontent.com",
  androidClientId: "164572726504-1lg9u7vu7ehtan92srmga1adr4opr99l.apps.googleusercontent.com"
};
const locale_en = {
  disclaimer:
    "TurkToplum is an information publishing and dissemination platform. It is up to users to evaluate the risk of information shared by users. In cases of legal disputes, the platform does not assume or accept any liability.",
  success: "upload successfully competed",
  email_reset:
    "After you enter your email address and click submit, you will be sent a link to your email where you can access it and reset your password. You can create a new password by clicking on this link.",
  useconditions: "please agree to user terms!!!",
  usecoditiontitle: "user terms",
  open_email: "open email",
  check_email: "check your email inbox to reset your password",
  sending_wait: "Sending email please wait...",
  relogin_header: "please relogin",
  relogin_msg: "Your token has been updated please relogin later.\nnow switching to guest account",
  upload_goback: "are you sure you want to go back?\nPlease note that any modifications made will be discarded.",
  text_copied: "text copied to clipboard",
  preview: "Preview"
};
const locale_tr = {
  news: "Gündem",
  work: "İş İlanları",
  house: "Emlak",
  market: "Alışveriş",
  discount: "İndirim",
  community: "Sosyal",
  promote: "Keşfet",
  upload: "Yüklemek",
  "try again": "Tekrar dene",
  skip: "Atla",
  delete: "Sil",
  cancel: "İptal",
  yes: "Evet",
  comment: "Yorum",
  max: "Maksimum",
  min: "Minimum",
  "image upload": "Resim yükleme",
  comments: "Yorumlar",
  filters: "Filtrele",
  apply: "Uygulamak",
  update: "Güncelleme",
  "hold on!": "Bekle!",
  "are you sure you want to delete this post?": "Bu gönderiyi silmek istediğinizden emin misiniz?",
  "loading please wait...": "Yükleniyor, lütfen bekleyin...",
  responses: "cevaplamalar",
  "city name": "Şehir Adı",
  radius: "Yarıçap",
  location: "Konum",
  description: "Açıklama(Çok Kısa Olmayacak) ...",
  "uploading...": "Yükleniyor...",
  upload_goback: "Geri gitmek istediğinizden emin misiniz?\nLütfen yapılan değişikliklerin kaybedileceğini unutmayın.",
  ok: "Tamam",
  no: "Hayır",
  resend: "Yeniden gönder",
  send: "Gönder",
  messages: "Mesajlar",
  homepage: "Ana Sayfa",
  notification: "Bildirim",
  profile: "Profil",
  "marked fields are required": "İşaretli alanlar zorunludur",
  "username is required": "Kullanıcı adı gereklidir",
  "two passwords must match": "İki parola eşleşmelidir",
  "profile updated successfully": "Profil başarıyla güncellendi",
  "contact the user": "Kullanıcıyla iletişime geçin",
  report: "Rapor",
  free: "Ücretsiz",
  yesterday: "Dün",
  today: "Bugün",
  "no internet connection please check your connections!!!": "İnternet bağlantısı yok, lütfen kontrol edin!!!",
  "no data found on the server!!!": "Aradığınız kriterde ilan bulunamadı!",
  "no result": "Sonuç yok",
  "are you sure you want to log out?": "Çıkış yapmak istediğinizden emin misiniz?",
  "are you sure you want to delete this chat?": "Bu sohbeti silmek istediğinizden emin misiniz?",
  "cache size": "Önbellek büyüklüğü",
  "clear cache": "Önbelleği temizle",
  "your search history,last used filters and recent viwed caches will be deleted. would you like to continue?":
    "Arama geçmişiniz, son kullanılan filtreler ve son görüntülenen önbellekler silinecektir. Devam etmek ister misiniz?",
  "logout your account": "Hesabınızdan çıkış yapın",
  "login your account": "Hesabınıza giriş yapın",
  "logging out...": "Çıkış yapılıyor...",
  "open post": "Gönderiyi aç",
  "please login to see chat messages!!!": "Lütfen sohbet mesajlarını görmek için giriş yapın!!!",
  "loading...": "yükleniyor...",
  "logging in...": "Giriş yapılıyor...",
  "do not exchange sensitive information here": "Lütfen hassas bilgilerinizi paylaşmayınız",
  disclaimer:
    "Türktoplum, bilgi yayınlama ve yayma platformudur. Kullanıcılar tarafından paylaşılan bilgilerin riskini değerlendirmek kullanıcılara aittir. Yasal anlaşmazlık durumlarında platform, herhangi bir sorumluluğu üstlenmez veya kabul etmez.",
  message: "Mesaj",
  "uploading images": "Resimler yükleniyor...",
  success: "yükleme başarıyla tamamlandı",
  email_reset:
    "E-posta adresinizi girdikten ve gönder düğmesine tıkladıktan sonra, e-postanıza erişim sağlayabileceğiniz ve şifrenizi sıfırlayabileceğiniz bir bağlantı gönderilecektir. Bu bağlantıyı tıklayarak yeni bir şifre oluşturabilirsiniz.",
  useconditions: "lütfen kullanici şartlarini kabul edi̇n!!!",
  usecoditiontitle: "Kullanım Şartları",
  open_email: "e-postayı aç",
  check_email: "şifrenizi sıfırlamak için e-posta gelen kutunuzu kontrol edin",

  sending_wait: "Gönderiliyor lütfen bekleyin...",
  relogin_title: "yeniden giriş yapın",
  relogin_msg: "belirteciniz güncellendi lütfen daha sonra yeniden giriş yapın.\nşimdi misafir hesabına geçiyorum.",
  email_phone_required: "E-posta adresi veya telefon numarasından en az biri gereklidir.",
  text_copied: "mesaj kopyalandı",
  upload_fail: "yükleme başarısız",
  resend_success: "Onay e-postası başarıyla yeniden gönderildi. lütfen e-postanızı kontrol edin",
  preview: "Önizleme",
  resendverification: "Doğrulamayı tekrar gönder"
};

export const Translation = (key) => {
  /**key of the list must be lower case */
  const list = locale_tr;
  const k = list[String(key).toLowerCase()];
  if (k) {
    return k;
  }
  return key;
};

export { Color, TextSize, App, Fonts };
