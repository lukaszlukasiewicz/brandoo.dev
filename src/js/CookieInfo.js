import cookie from 'cookie'
const cookieWrapper = document.getElementById('CookieInfo');
cookieWrapper.remove();

const accetpCookies = () => {  
  document.cookie = cookie.serialize('brandoo__dev__permision',1, {
    maxAge: 60 * 60 * 24 * 30 
  });
  cookieWrapper.classList.add('cookieFade');
  setTimeout( () => {
    cookieWrapper.remove();
  },500)
}

const CookieInfo = () => {
  if(!cookieWrapper) return false;
  const acceptBtn = cookieWrapper.querySelector('button.acceptCookies');
  const cookies = cookie.parse(document.cookie);
  const cookiesAccepted =  cookies.brandoo__dev__permision;
  
  if(cookiesAccepted) return false;
  document.body.append(cookieWrapper);
  acceptBtn.addEventListener('click', accetpCookies);
}

export default CookieInfo