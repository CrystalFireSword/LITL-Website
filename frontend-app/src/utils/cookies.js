export const cookies = {
    get: (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    },
    set: (name, value, days) => {
        const expires = days ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}` : '';
        document.cookie = `${name}=${value}${expires}; path=/; SameSite=Strict`;
    },
    remove: (name) => {
        document.cookie = `${name}=; Max-Age=-99999999; path=/`;
    }
};
