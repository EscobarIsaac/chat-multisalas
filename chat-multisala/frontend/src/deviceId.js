export const getDeviceId = async () => {
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    const ip = ipData.ip;
    const userAgent = navigator.userAgent;
    return `${ip}_${userAgent}`;
  } catch (error) {
    return `UNKNOWN_${navigator.userAgent}`;
  }
};