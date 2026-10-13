/** Maps salon service names to locally hosted AI-generated treatment photographs. */
const serviceImages = {
  "eyebrow threading": '/images/services/service-01.webp',
  "upper lip": '/images/services/service-02.webp',
  "chin": '/images/services/service-03.webp',
  "forehead": '/images/services/service-04.webp',
  "sideburns": '/images/services/service-05.webp',
  "neck": '/images/services/service-06.webp',
  "full face threading": '/images/services/service-07.webp',
  "brow tinting": '/images/services/service-08.webp',
  "brow lamination": '/images/services/service-09.webp',
  "brow shaping + tint": '/images/services/service-10.webp',
  "brow lamination + tint": '/images/services/service-11.webp',
  "lash tint": '/images/services/service-12.webp',
  "lash lift": '/images/services/service-13.webp',
  "lash lift + tint": '/images/services/service-14.webp',
  "cluster/temporary eyelash extensions": '/images/services/service-15.webp',
  "upper lip wax": '/images/services/service-16.webp',
  "chin wax": '/images/services/service-17.webp',
  "underarms wax": '/images/services/service-18.webp',
  "arms wax": '/images/services/service-19.webp',
  "legs wax": '/images/services/service-20.webp',
  "face waxing": '/images/services/service-21.webp',
  "mini facial": '/images/services/service-22.webp',
  "hydrating facial": '/images/services/service-23.webp',
  "deep cleansing facial": '/images/services/service-24.webp',
  "brightening facial": '/images/services/service-25.webp',
  "light chemical peel": '/images/services/service-26.webp',
};

export function getServiceImage(service) {
  return serviceImages[String(service.name || '').trim().toLowerCase()] || '';
}
