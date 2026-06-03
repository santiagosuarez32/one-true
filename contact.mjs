import sharp from 'sharp';
import https from 'https';

const cands = [
  ['Evaluation','1844/1844921'],
  ['Assessment','8929/8929862'],
  ['Assessment2','8901/8901485'],
  ['GoodFeedback','9751/9751072'],
  ['Data','9070/9070873'],
  ['Assessment3','11112/11112891'],
  ['Assessment4','12443/12443240'],
  ['Evaluation2','9334/9334438'],
  ['Evaluation3','6757/6757112'],
  ['Evaluation4','9912/9912341'],
  ['Evaluation5','5261/5261030'],
  ['Evaluation6','9926/9926288'],
];

function dl(path){return new Promise((res,rej)=>{
  https.get('https://cdn-icons-png.flaticon.com/512/'+path+'.png',{headers:{'Referer':'https://www.flaticon.com/'}},r=>{
    if(r.statusCode!==200){rej(new Error(r.statusCode+' '+path));return;}
    const b=[];r.on('data',c=>b.push(c));r.on('end',()=>res(Buffer.concat(b)));
  }).on('error',rej);
});}

const cell=180, cols=4, rows=Math.ceil(cands.length/cols);
const W=cols*cell, H=rows*cell;
const composites=[];
for(let i=0;i<cands.length;i++){
  try{
    const buf=await dl(cands[i][1]);
    const icon=await sharp(buf).resize(140,140,{fit:'contain',background:{r:255,g:255,b:255,alpha:1}}).flatten({background:'#ffffff'}).png().toBuffer();
    const x=(i%cols)*cell+20, y=Math.floor(i/cols)*cell+10;
    composites.push({input:icon,left:x,top:y});
    const label=await sharp({text:{text:`${i+1}. ${cands[i][0]}`,font:'sans',rgba:true,width:160,height:24}}).png().toBuffer();
    composites.push({input:label,left:x,top:y+150});
  }catch(e){console.log('FAIL',cands[i][0],e.message);}
}
await sharp({create:{width:W,height:H,channels:3,background:'#ffffff'}}).composite(composites).png().toFile('contact-sheet.png');
console.log('done');
