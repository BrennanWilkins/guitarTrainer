(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[5],{113:function(e,t,a){e.exports={Content:"ChordTrainer_Content__3mR-7",NoScroll:"ChordTrainer_NoScroll__2-JGr",Title:"ChordTrainer_Title__2W49z",TopBar:"ChordTrainer_TopBar__1tt-4",InnerTitle:"ChordTrainer_InnerTitle__3hfzW"}},119:function(e,t,a){"use strict";a.r(t);var c=a(5),n=a(0),r=a.n(n),o=a(113),u=a.n(o),s=a(103),i=a(29),l=a(97),b=a(98),j=a(99),O=a(100),d=a(101),h=a(14),m=a(6),f=a(45),p=a(102);t.default=Object(h.b)((function(e){return{totCorrect:e.stats.totChordCorrectToday,chordGoal:e.goals.chordGoal,isAuth:e.auth.isAuth}}),(function(e){return{incCorrect:function(){return e(Object(m.e)())},incWrong:function(){return e(Object(m.h)())}}}))((function(e){var t=Object(n.useState)(0),a=Object(c.a)(t,2),o=a[0],h=a[1],m=Object(n.useState)(!1),S=Object(c.a)(m,2),C=S[0],T=S[1],g=Object(n.useState)(0),E=Object(c.a)(g,2),_=E[0],w=E[1],y=Object(n.useState)(!1),v=Object(c.a)(y,2),N=v[0],A=v[1],G=Object(n.useState)(!1),B=Object(c.a)(G,2),W=B[0],k=B[1],I=Object(n.useState)(!1),J=Object(c.a)(I,2),z=J[0],R=J[1],x=Object(n.useState)(""),M=Object(c.a)(x,2),Y=M[0],q=M[1],D=Object(n.useState)(""),F=Object(c.a)(D,2),H=F[0],K=F[1],L=Object(n.useState)(""),P=Object(c.a)(L,2),Q=P[0],U=P[1],V=Object(n.useState)(""),X=Object(c.a)(V,2),Z=X[0],$=X[1],ee=Object(n.useState)(),te=Object(c.a)(ee,2),ae=te[0],ce=te[1],ne=Object(n.useState)(),re=Object(c.a)(ne,2),oe=re[0],ue=re[1],se=Object(n.useState)(),ie=Object(c.a)(se,2),le=ie[0],be=ie[1],je=Object(n.useState)(!1),Oe=Object(c.a)(je,2),de=Oe[0],he=Oe[1],me=Object(n.useState)([]),fe=Object(c.a)(me,2),pe=fe[0],Se=fe[1],Ce=Object(n.useState)(""),Te=Object(c.a)(Ce,2),ge=Te[0],Ee=Te[1],_e=Object(n.useState)(!1),we=Object(c.a)(_e,2),ye=we[0],ve=we[1],Ne=Object(n.useState)("Both"),Ae=Object(c.a)(Ne,2),Ge=Ae[0],Be=Ae[1],We=Object(n.useState)("Both"),ke=Object(c.a)(We,2),Ie=ke[0],Je=ke[1],ze=Object(n.useState)(!0),Re=Object(c.a)(ze,2),xe=Re[0],Me=Re[1],Ye=Object(n.useState)("3"),qe=Object(c.a)(Ye,2),De=qe[0],Fe=qe[1],He=Object(n.useState)(!1),Ke=Object(c.a)(He,2),Le=Ke[0],Pe=Ke[1],Qe=Object(n.useState)(!1),Ue=Object(c.a)(Qe,2),Ve=Ue[0],Xe=Ue[1],Ze=Object(n.useState)(!1),$e=Object(c.a)(Ze,2),et=$e[0],tt=$e[1],at=Object(n.useRef)();Object(n.useEffect)((function(){w(0),h(0)}),[e.isAuth]),Object(n.useEffect)((function(){e.totChordCorrect<e.chordGoal&&tt(!1)}),[e.chordGoal]);var ct=function(){var e=Object(i.d)(pe,Ge),t=Object(c.a)(e,4),a=t[0],n=t[1],r=t[2],o=t[3],u=new Audio("/assets/notes/".concat(a,".mp3")),s=new Audio("/assets/notes/".concat(n,".mp3")),l=new Audio("/assets/notes/".concat(r,".mp3"));q(a),K(n),U(r),$(o),ce(u),ue(s),be(l),xe&&(u.autoplay=!1,s.autoplay=!1,l.autoplay=!1,u.play(),s.play(),l.play())};return r.a.createElement("div",{className:!z||de?[u.a.Content,u.a.NoScroll].join(" "):u.a.Content},r.a.createElement(f.a,{show:Ve}),r.a.createElement(p.a,{show:et,mode:"Chord",close:function(){return tt(!1)}}),r.a.createElement("h1",{className:u.a.Title},"Chord Trainer"),r.a.createElement("div",{className:u.a.TopBar},r.a.createElement(l.a,{showSettings:function(){he(!0),tt(!1)},pause:function(){R(!1),tt(!1)},repeat:function(){ae.pause(),oe.pause(),le.pause(),ae.currentTime=0,oe.currentTime=0,le.currentTime=0,xe&&(ae.play(),oe.play(),le.play())},started:z,mode:"Chord",clicked:function(){ae.muted=xe,oe.muted=xe,le.muted=xe,ae.pause(),oe.pause(),le.pause(),Me((function(e){return!e}))},volumeOn:xe}),r.a.createElement("h1",{className:u.a.InnerTitle},"Chord Trainer"),r.a.createElement(b.a,{animCorrect:C,animWrong:N,correct:o,wrong:_})),r.a.createElement(s.a,{rootNote:Y,otherNotes:[H,Q],noAnim:Le}),r.a.createElement(d.a,{disabledBtns:pe,checkAnswer:function(t){t.target.value===Object(i.e)(Y)&&De===Z?(ae.pause(),oe.pause(),le.pause(),ae.muted=!0,oe.muted=!0,le.muted=!0,e.incCorrect(),e.chordGoal>0&&e.totCorrect+1===e.chordGoal&&tt(!0),h((function(e){return e+1})),T(!0),setTimeout((function(){Pe(!1),T(!1),ct()}),300)):(e.incWrong(),A(!0),setTimeout((function(){A(!1)}),300),w((function(e){return e+1})))},mode:"Chord",selectedChord:De,setSelected:function(e){return Fe(e)}}),r.a.createElement(j.a,{mode:"Chord",started:function(){W||(k(!0),ct(),setTimeout((function(){return Xe(!0)}),2e3)),R(!0)},startGame:z}),r.a.createElement(O.a,{showSettings:de,ref:at,close:function(e,t){(!ye&&t.target===at.current||e)&&(he(!1),(pe.includes(Object(i.e)(Y))||Ge!==Ie)&&(Pe(!0),Je(Ge),ct()))},mode:"Chord",toggle:function(e){var t=e.target.value;pe.includes(t)?(Se((function(e){return e.filter((function(e){return e!==t}))})),pe.length<12&&(ve(!1),Ee(""))):(Se((function(e){return e.concat([t])})),pe.length>9&&(ve(!0),Ee("You need to have at least two chords enabled.")))},disabledBtns:pe,showErr:ye,errMsg:ge,setType:function(e){return Be(e)},intType:Ge}))}))}}]);
//# sourceMappingURL=5.67c80c2d.chunk.js.map