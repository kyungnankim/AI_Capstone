const { ctx, document } = require('./dom.test.cjs');
const vm = require('vm');
vm.runInContext(`
stopTech();stopSetup();pause();
for(const kind of ['server','mcp']){techView=kind;$('#server-case').value='valid';for(let i=0;i<techFrames().length;i++){techStep=i;renderTech();if(!$('#'+kind+'-stage').innerHTML.includes('tech-actor'))throw Error('Missing actors');if(!$('#'+kind+'-payload').textContent)throw Error('Missing frame data')}}
if(mcpFrames().length!==12)throw Error('MCP must have 12 steps');
if(mcpActors.length!==5)throw Error('User and host must be separate');
if(mcpFrames()[0].data.indexOf('connection refused')<0)throw Error('Missing incident symptom');
if(mcpFrames()[4].title!=='Resource 읽기'||mcpFrames()[7].title!=='LLM이 Tool 호출 요청')throw Error('MCP order');
if(mcpFrames()[11].data.indexOf('실제 복구 명령은 실행하지 않았습니다')<0)throw Error('Final scope');
view('map');if(mapTopics.length!==15)throw Error('Missing curriculum topics');
for(const topic of mapTopics){selectedMapTopic=topic.id;renderStudyMap();if(!$('#map-detail').innerHTML.includes(topic.title))throw Error('Map topic missing')}
if(serverFrames(true).some(f=>f.title.includes('await')))throw Error('Invalid input executed handler');
let a=printerSnapshot(2,6,true),b=printerSnapshot(2,6,false);if(a.mail!==2||b.mail!==0)throw Error('Async scheduling');
if(printerSnapshot(0,6,true).end!==6||printerSnapshot(0,6,false).end!==10)throw Error('Printer duration');
if(asyncCodeState(2,6,false).officeLine!==-1)throw Error('Sequential await');
mode='factory';$('#scenario').value='complex';setPath();requestPhase='received';step=2;draw();
for(let k=0;k<7;k++){insideStep=k;renderInside();const state=JSON.parse($('#state').textContent);if(state.tasks.length!==Math.max(0,Math.min(3,k-1)))throw Error('Planning task insertion');if((state.next_agent==='Research')!==(k>=5))throw Error('Dispatch condition')}
supervisorRound=1;insideStep=2;renderInside();if(JSON.parse($('#state').textContent).next_agent!=='Analysis')throw Error('Return dispatch');supervisorRound=0;
for(const m of ['factory','rag']){for(const scenario of ['simple','complex','retry']){mode=m;$('#scenario').value=scenario;setPath();step=0;draw();for(let j=0;j<path.length;j++){step=j;update();for(let k=0;k<internalFlow().length;k++){insideStep=k;renderInside();if(!$('#inside-data').textContent)throw Error('Missing internal data')}}}}
mode='factory';$('#scenario').value='complex';setPath();requestPhase='ready';step=0;draw();update();if(!$('#state').textContent.includes('ready_to_send'))throw Error('Request entrance');requestPhase='received';step=path.length-1;update();insideStep=3;renderInside();if($('#browser-status').textContent!=='응답 수신 완료')throw Error('Final screen');
stopTech();stopSetup();stopAsync();pause();
console.log('PASS: 12-step MCP, full topic map, API validation, printer scheduling, all internal flows, Supervisor dispatch and final chat');
`, ctx);
