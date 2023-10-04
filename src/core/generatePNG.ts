import { Compass } from './generateSVG';
import sharp from 'sharp';

const generatePNGFactory = (generateSVG: (compass: Compass) => string) => async (compass: Compass): Promise<Buffer> => {
  const svg = generateSVG(compass)
  const png = await sharp(Buffer.from(svg, "utf8"))
  .resize(3000)
  .png()
  .toBuffer()
  return png
}


export default generatePNGFactory