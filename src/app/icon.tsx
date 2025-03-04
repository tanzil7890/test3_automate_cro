import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFileSync } from 'fs';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default async function Icon() {
  try {
    // Read the image file and convert to base64
    const iconPath = join(process.cwd(), 'public', 'outhad-logo.png');
    const iconBuffer = readFileSync(iconPath);
    const base64Image = `data:image/png;base64,${iconBuffer.toString('base64')}`;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            borderRadius: '50%',
          }}
        >
          <img
            src={base64Image}
            alt="Outhad AI Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error: unknown) {
    console.error('Error generating icon:', error);
    return new Response('Failed to generate icon', { status: 500 });
  }
}