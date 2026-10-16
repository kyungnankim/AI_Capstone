from pathlib import Path
from html.parser import HTMLParser
import json
class P(HTMLParser):
 def __init__(self):super().__init__();self.out=[];self.stack=[]
 def handle_starttag(self,t,a):
  if any(self.out[i]['tag']=='script' for i in self.stack):return
  i=len(self.out);self.out.append({'tag':t,'attrs':dict(a),'parent':self.stack[-1] if self.stack else None})
  if t not in ['meta','link','input','br','hr','img','path','rect','circle']:self.stack.append(i)
 def handle_endtag(self,t):
  for j in range(len(self.stack)-1,-1,-1):
   if self.out[self.stack[j]]['tag']==t:self.stack=self.stack[:j];break
p=P();p.feed((Path(__file__).resolve().parents[1] / 'src/index.html').read_text());(Path(__file__).resolve().parent / 'dom-structure.json').write_text(json.dumps(p.out))
