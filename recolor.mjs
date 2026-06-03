import sharp from 'sharp';

const names = ['zct-federal','bi-zona','utah-3r','utah-4r','afmgqt','dlst','cit'];
const PURPLE = '#700FA3';
const W = 256, H = 256;

for (const name of names) {
  try {
    const base = sharp(`public/icons/_raw/${name}.png`).resize(W, H, { fit:'contain', background:{r:0,g:0,b:0,alpha:0} }).ensureAlpha();
    const alpha = await base.clone().extractChannel(3).raw().toBuffer();
    await sharp({ create:{ width:W, height:H, channels:3, background:PURPLE } })
      .joinChannel(alpha)
      .png()
      .toFile(`public/icons/${name}.png`);
    console.log('OK', name);
  } catch(e) { console.log('FAIL', name, e.message); }
}
