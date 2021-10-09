export function getBaseDomain() {
    const hostName = location.hostname.split('.');
    while (hostName.length > 2) {
        hostName.shift();
    }
    return hostName.join('.')
}