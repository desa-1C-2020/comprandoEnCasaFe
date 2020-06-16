export function apiBasicUrl() {
    let reactappapiurl = process.env.REACT_APP_API_URL;
    console.log('Url de .env: ' + reactappapiurl);
    return reactappapiurl || 'http://localhost:8080';
}