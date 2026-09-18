"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[5403],{45403:(e,t,o)=>{o.r(t);o.d(t,{Accordion:()=>be.Accordion,AccordionItem:()=>be.AccordionItem,Anchor:()=>ui,AnchoredRegion:()=>be.AnchoredRegion,Avatar:()=>xi,Badge:()=>be.Badge,Breadcrumb:()=>be.Breadcrumb,BreadcrumbItem:()=>be.BreadcrumbItem,Button:()=>ji,Card:()=>Ni,Checkbox:()=>Ai,Combobox:()=>qi,DataGrid:()=>be.DataGrid,DataGridCell:()=>be.DataGridCell,DataGridRow:()=>be.DataGridRow,DelegatesARIAToolbar:()=>Ll,DesignSystemProvider:()=>pn,Dialog:()=>be.Dialog,DirectionalStyleSheetBehavior:()=>bi,Disclosure:()=>xn,Divider:()=>be.Divider,FoundationToolbar:()=>Ol,Listbox:()=>Cn,Menu:()=>Tn,MenuItem:()=>be.MenuItem,NumberField:()=>Bn,Option:()=>be.ListboxOption,PaletteRGB:()=>nt,Picker:()=>be.Picker,PickerMenu:()=>es,Progress:()=>be.BaseProgress,ProgressRing:()=>be.BaseProgress,Radio:()=>Gn,RadioGroup:()=>qn,Search:()=>Yn,Select:()=>Qn,Skeleton:()=>be.Skeleton,Slider:()=>nl,SliderLabel:()=>hl,StandardLuminance:()=>he,SwatchRGB:()=>se,Switch:()=>bl,Tab:()=>be.Tab,TabPanel:()=>be.TabPanel,Tabs:()=>be.Tabs,TextArea:()=>Cl,TextField:()=>Tl,Toolbar:()=>Hl,Tooltip:()=>be.Tooltip,TreeItem:()=>be.TreeItem,TreeView:()=>be.TreeView,accentColor:()=>Uo,accentFillActive:()=>hr,accentFillActiveDelta:()=>mo,accentFillFocus:()=>pr,accentFillFocusDelta:()=>vo,accentFillHover:()=>ur,accentFillHoverDelta:()=>fo,accentFillRecipe:()=>cr,accentFillRest:()=>dr,accentFillRestDelta:()=>bo,accentForegroundActive:()=>Vr,accentForegroundActiveDelta:()=>yo,accentForegroundFocus:()=>jr,accentForegroundFocusDelta:()=>wo,accentForegroundHover:()=>Dr,accentForegroundHoverDelta:()=>xo,accentForegroundRecipe:()=>Sr,accentForegroundRest:()=>Tr,accentForegroundRestDelta:()=>$o,accentPalette:()=>Xo,accordionItemStyles:()=>Ka,accordionStyles:()=>Za,addJupyterLabThemeChangeListener:()=>_a,allComponents:()=>is,anchorStyles:()=>di,anchoredRegionStyles:()=>pi,applyJupyterTheme:()=>Ua,avatarStyles:()=>$i,badgeStyles:()=>ki,baseHeightMultiplier:()=>At,baseHorizontalSpacingMultiplier:()=>Mt,baseLayerLuminance:()=>Gt,bodyFont:()=>It,breadcrumbItemStyles:()=>Ti,breadcrumbStyles:()=>Fi,buttonStyles:()=>Vi,cardStyles:()=>Hi,checkboxStyles:()=>Ri,checkboxTemplate:()=>Ii,comboboxStyles:()=>Ei,controlCornerRadius:()=>_t,dataGridCellStyles:()=>Zi,dataGridRowStyles:()=>Xi,dataGridStyles:()=>Ui,density:()=>Et,designSystemProviderStyles:()=>bn,designSystemProviderTemplate:()=>gn,designUnit:()=>qt,dialogStyles:()=>mn,direction:()=>Wt,disabledOpacity:()=>Ut,disclosureStyles:()=>$n,dividerStyles:()=>wn,errorColor:()=>ba,errorFillActive:()=>xa,errorFillFocus:()=>ya,errorFillHover:()=>$a,errorFillRecipe:()=>ma,errorFillRest:()=>va,errorForegroundActive:()=>Pa,errorForegroundFocus:()=>Ra,errorForegroundHover:()=>Na,errorForegroundRecipe:()=>La,errorForegroundRest:()=>Ha,errorPalette:()=>fa,fillColor:()=>lr,focusStrokeInner:()=>oa,focusStrokeInnerRecipe:()=>ta,focusStrokeOuter:()=>ea,focusStrokeOuterRecipe:()=>Qr,focusStrokeWidth:()=>Zt,foregroundOnAccentActive:()=>vr,foregroundOnAccentActiveLarge:()=>kr,foregroundOnAccentFocus:()=>$r,foregroundOnAccentFocusLarge:()=>Cr,foregroundOnAccentHover:()=>mr,foregroundOnAccentHoverLarge:()=>wr,foregroundOnAccentLargeRecipe:()=>xr,foregroundOnAccentRecipe:()=>br,foregroundOnAccentRest:()=>fr,foregroundOnAccentRestLarge:()=>yr,foregroundOnErrorActive:()=>Sa,foregroundOnErrorActiveLarge:()=>za,foregroundOnErrorFocus:()=>Ta,foregroundOnErrorFocusLarge:()=>Ba,foregroundOnErrorHover:()=>Fa,foregroundOnErrorHoverLarge:()=>ja,foregroundOnErrorLargeRecipe:()=>Da,foregroundOnErrorRecipe:()=>ka,foregroundOnErrorRest:()=>Ca,foregroundOnErrorRestLarge:()=>Va,heightNumberAsToken:()=>ga,horizontalSliderLabelStyles:()=>cl,imgTemplate:()=>yi,isDark:()=>ge,jpAccordion:()=>ei,jpAccordionItem:()=>Qa,jpAnchor:()=>hi,jpAnchoredRegion:()=>gi,jpAvatar:()=>wi,jpBadge:()=>Ci,jpBreadcrumb:()=>Si,jpBreadcrumbItem:()=>Di,jpButton:()=>zi,jpCard:()=>Pi,jpCheckbox:()=>Mi,jpCombobox:()=>Wi,jpDataGrid:()=>Ki,jpDataGridCell:()=>Yi,jpDataGridRow:()=>Ji,jpDateField:()=>cn,jpDesignSystemProvider:()=>fn,jpDialog:()=>vn,jpDisclosure:()=>yn,jpDivider:()=>kn,jpListbox:()=>Fn,jpMenu:()=>Dn,jpMenuItem:()=>jn,jpNumberField:()=>On,jpOption:()=>Hn,jpPicker:()=>Ql,jpPickerList:()=>rs,jpPickerListItem:()=>as,jpPickerMenu:()=>ts,jpPickerMenuOption:()=>os,jpProgress:()=>Pn,jpProgressRing:()=>In,jpRadio:()=>_n,jpRadioGroup:()=>Wn,jpSearch:()=>Jn,jpSelect:()=>el,jpSkeleton:()=>ol,jpSlider:()=>ll,jpSliderLabel:()=>pl,jpSwitch:()=>fl,jpTab:()=>xl,jpTabPanel:()=>vl,jpTabs:()=>wl,jpTextArea:()=>Fl,jpTextField:()=>Dl,jpToolbar:()=>Nl,jpTooltip:()=>Rl,jpTreeItem:()=>ql,jpTreeView:()=>Ul,listboxStyles:()=>Gi,menuItemStyles:()=>Vn,menuStyles:()=>Sn,neutralColor:()=>qo,neutralFillActive:()=>Lr,neutralFillActiveDelta:()=>Fo,neutralFillFocus:()=>Hr,neutralFillFocusDelta:()=>So,neutralFillHover:()=>Or,neutralFillHoverDelta:()=>Co,neutralFillInputActive:()=>Ir,neutralFillInputActiveDelta:()=>Vo,neutralFillInputFocus:()=>Ar,neutralFillInputFocusDelta:()=>jo,neutralFillInputHover:()=>Rr,neutralFillInputHoverDelta:()=>Do,neutralFillInputRecipe:()=>Nr,neutralFillInputRest:()=>Pr,neutralFillInputRestDelta:()=>To,neutralFillLayerRecipe:()=>Jr,neutralFillLayerRest:()=>Kr,neutralFillLayerRestDelta:()=>Io,neutralFillRecipe:()=>zr,neutralFillRest:()=>Br,neutralFillRestDelta:()=>ko,neutralFillStealthActive:()=>Er,neutralFillStealthActiveDelta:()=>Oo,neutralFillStealthFocus:()=>qr,neutralFillStealthFocusDelta:()=>Lo,neutralFillStealthHover:()=>_r,neutralFillStealthHoverDelta:()=>Bo,neutralFillStealthRecipe:()=>Mr,neutralFillStealthRest:()=>Gr,neutralFillStealthRestDelta:()=>zo,neutralFillStrongActive:()=>Zr,neutralFillStrongActiveDelta:()=>Po,neutralFillStrongFocus:()=>Yr,neutralFillStrongFocusDelta:()=>Ro,neutralFillStrongHover:()=>Xr,neutralFillStrongHoverDelta:()=>No,neutralFillStrongRecipe:()=>Wr,neutralFillStrongRest:()=>Ur,neutralFillStrongRestDelta:()=>Ho,neutralForegroundHint:()=>aa,neutralForegroundHintRecipe:()=>ra,neutralForegroundRecipe:()=>ia,neutralForegroundRest:()=>na,neutralLayer1:()=>er,neutralLayer1Recipe:()=>Qo,neutralLayer2:()=>or,neutralLayer2Recipe:()=>tr,neutralLayer3:()=>ar,neutralLayer3Recipe:()=>rr,neutralLayer4:()=>nr,neutralLayer4Recipe:()=>ir,neutralLayerCardContainer:()=>Yo,neutralLayerCardContainerRecipe:()=>Zo,neutralLayerFloating:()=>Ko,neutralLayerFloatingRecipe:()=>Jo,neutralPalette:()=>Wo,neutralStrokeActive:()=>da,neutralStrokeActiveDelta:()=>Go,neutralStrokeDividerRecipe:()=>ha,neutralStrokeDividerRest:()=>pa,neutralStrokeDividerRestDelta:()=>Eo,neutralStrokeFocus:()=>ua,neutralStrokeFocusDelta:()=>_o,neutralStrokeHover:()=>ca,neutralStrokeHoverDelta:()=>Mo,neutralStrokeRecipe:()=>la,neutralStrokeRest:()=>sa,neutralStrokeRestDelta:()=>Ao,numberFieldStyles:()=>zn,optionStyles:()=>Ln,pickerListItemStyles:()=>Kl,pickerMenuOptionStyles:()=>Yl,pickerMenuStyles:()=>Zl,pickerStyles:()=>Xl,progressRingStyles:()=>Rn,progressStyles:()=>Nn,provideJupyterDesignSystem:()=>ns,radioGroupStyles:()=>En,radioStyles:()=>An,radioTemplate:()=>Mn,searchStyles:()=>Kn,selectStyles:()=>_i,skeletonStyles:()=>tl,sliderLabelStyles:()=>ul,sliderStyles:()=>il,strokeWidth:()=>Xt,switchStyles:()=>gl,tabPanelStyles:()=>ml,tabStyles:()=>$l,tabsStyles:()=>yl,textAreaStyles:()=>kl,textFieldStyles:()=>Sl,toolbarStyles:()=>zl,tooltipStyles:()=>Pl,treeItemStyles:()=>El,treeViewStyles:()=>Wl,typeRampBaseFontSize:()=>Yt,typeRampBaseLineHeight:()=>Jt,typeRampMinus1FontSize:()=>Kt,typeRampMinus1LineHeight:()=>Qt,typeRampMinus2FontSize:()=>eo,typeRampMinus2LineHeight:()=>to,typeRampPlus1FontSize:()=>oo,typeRampPlus1LineHeight:()=>ro,typeRampPlus2FontSize:()=>ao,typeRampPlus2LineHeight:()=>io,typeRampPlus3FontSize:()=>no,typeRampPlus3LineHeight:()=>lo,typeRampPlus4FontSize:()=>so,typeRampPlus4LineHeight:()=>co,typeRampPlus5FontSize:()=>uo,typeRampPlus5LineHeight:()=>ho,typeRampPlus6FontSize:()=>po,typeRampPlus6LineHeight:()=>go,verticalSliderLabelStyles:()=>dl});function r(e,t,o){if(isNaN(e)||e<=t){return t}else if(e>=o){return o}return e}function a(e,t,o){if(isNaN(e)||e<=t){return 0}else if(e>=o){return 1}return e/(o-t)}function i(e,t,o){if(isNaN(e)){return t}return t+e*(o-t)}function n(e){return e*(Math.PI/180)}function l(e){return e*(180/Math.PI)}function s(e){const t=Math.round(r(e,0,255)).toString(16);if(t.length===1){return"0"+t}return t}function c(e,t,o){if(isNaN(e)||e<=0){return t}else if(e>=1){return o}return t+e*(o-t)}function d(e,t,o){if(e<=0){return t%360}else if(e>=1){return o%360}const r=(t-o+360)%360;const a=(o-t+360)%360;if(r<=a){return(t-r*e+360)%360}return(t+r*e+360)%360}const u=Math.PI*2;function h(e,t,o){if(isNaN(e)||e<=0){return t%u}else if(e>=1){return o%u}const r=(t-o+u)%u;const a=(o-t+u)%u;if(r<=a){return(t-r*e+u)%u}return(t+r*e+u)%u}function p(e,t){const o=Math.pow(10,t);return Math.round(e*o)/o}class g{constructor(e,t,o,r){this.r=e;this.g=t;this.b=o;this.a=typeof r==="number"&&!isNaN(r)?r:1}static fromObject(e){return e&&!isNaN(e.r)&&!isNaN(e.g)&&!isNaN(e.b)?new g(e.r,e.g,e.b,e.a):null}equalValue(e){return this.r===e.r&&this.g===e.g&&this.b===e.b&&this.a===e.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(i(this.r,0,255))},${Math.round(i(this.g,0,255))},${Math.round(i(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(i(this.r,0,255))},${Math.round(i(this.g,0,255))},${Math.round(i(this.b,0,255))},${r(this.a,0,1)})`}roundToPrecision(e){return new g(p(this.r,e),p(this.g,e),p(this.b,e),p(this.a,e))}clamp(){return new g(r(this.r,0,1),r(this.g,0,1),r(this.b,0,1),r(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(e){return s(i(e,0,255))}}const b={aliceblue:{r:.941176,g:.972549,b:1},antiquewhite:{r:.980392,g:.921569,b:.843137},aqua:{r:0,g:1,b:1},aquamarine:{r:.498039,g:1,b:.831373},azure:{r:.941176,g:1,b:1},beige:{r:.960784,g:.960784,b:.862745},bisque:{r:1,g:.894118,b:.768627},black:{r:0,g:0,b:0},blanchedalmond:{r:1,g:.921569,b:.803922},blue:{r:0,g:0,b:1},blueviolet:{r:.541176,g:.168627,b:.886275},brown:{r:.647059,g:.164706,b:.164706},burlywood:{r:.870588,g:.721569,b:.529412},cadetblue:{r:.372549,g:.619608,b:.627451},chartreuse:{r:.498039,g:1,b:0},chocolate:{r:.823529,g:.411765,b:.117647},coral:{r:1,g:.498039,b:.313725},cornflowerblue:{r:.392157,g:.584314,b:.929412},cornsilk:{r:1,g:.972549,b:.862745},crimson:{r:.862745,g:.078431,b:.235294},cyan:{r:0,g:1,b:1},darkblue:{r:0,g:0,b:.545098},darkcyan:{r:0,g:.545098,b:.545098},darkgoldenrod:{r:.721569,g:.52549,b:.043137},darkgray:{r:.662745,g:.662745,b:.662745},darkgreen:{r:0,g:.392157,b:0},darkgrey:{r:.662745,g:.662745,b:.662745},darkkhaki:{r:.741176,g:.717647,b:.419608},darkmagenta:{r:.545098,g:0,b:.545098},darkolivegreen:{r:.333333,g:.419608,b:.184314},darkorange:{r:1,g:.54902,b:0},darkorchid:{r:.6,g:.196078,b:.8},darkred:{r:.545098,g:0,b:0},darksalmon:{r:.913725,g:.588235,b:.478431},darkseagreen:{r:.560784,g:.737255,b:.560784},darkslateblue:{r:.282353,g:.239216,b:.545098},darkslategray:{r:.184314,g:.309804,b:.309804},darkslategrey:{r:.184314,g:.309804,b:.309804},darkturquoise:{r:0,g:.807843,b:.819608},darkviolet:{r:.580392,g:0,b:.827451},deeppink:{r:1,g:.078431,b:.576471},deepskyblue:{r:0,g:.74902,b:1},dimgray:{r:.411765,g:.411765,b:.411765},dimgrey:{r:.411765,g:.411765,b:.411765},dodgerblue:{r:.117647,g:.564706,b:1},firebrick:{r:.698039,g:.133333,b:.133333},floralwhite:{r:1,g:.980392,b:.941176},forestgreen:{r:.133333,g:.545098,b:.133333},fuchsia:{r:1,g:0,b:1},gainsboro:{r:.862745,g:.862745,b:.862745},ghostwhite:{r:.972549,g:.972549,b:1},gold:{r:1,g:.843137,b:0},goldenrod:{r:.854902,g:.647059,b:.12549},gray:{r:.501961,g:.501961,b:.501961},green:{r:0,g:.501961,b:0},greenyellow:{r:.678431,g:1,b:.184314},grey:{r:.501961,g:.501961,b:.501961},honeydew:{r:.941176,g:1,b:.941176},hotpink:{r:1,g:.411765,b:.705882},indianred:{r:.803922,g:.360784,b:.360784},indigo:{r:.294118,g:0,b:.509804},ivory:{r:1,g:1,b:.941176},khaki:{r:.941176,g:.901961,b:.54902},lavender:{r:.901961,g:.901961,b:.980392},lavenderblush:{r:1,g:.941176,b:.960784},lawngreen:{r:.486275,g:.988235,b:0},lemonchiffon:{r:1,g:.980392,b:.803922},lightblue:{r:.678431,g:.847059,b:.901961},lightcoral:{r:.941176,g:.501961,b:.501961},lightcyan:{r:.878431,g:1,b:1},lightgoldenrodyellow:{r:.980392,g:.980392,b:.823529},lightgray:{r:.827451,g:.827451,b:.827451},lightgreen:{r:.564706,g:.933333,b:.564706},lightgrey:{r:.827451,g:.827451,b:.827451},lightpink:{r:1,g:.713725,b:.756863},lightsalmon:{r:1,g:.627451,b:.478431},lightseagreen:{r:.12549,g:.698039,b:.666667},lightskyblue:{r:.529412,g:.807843,b:.980392},lightslategray:{r:.466667,g:.533333,b:.6},lightslategrey:{r:.466667,g:.533333,b:.6},lightsteelblue:{r:.690196,g:.768627,b:.870588},lightyellow:{r:1,g:1,b:.878431},lime:{r:0,g:1,b:0},limegreen:{r:.196078,g:.803922,b:.196078},linen:{r:.980392,g:.941176,b:.901961},magenta:{r:1,g:0,b:1},maroon:{r:.501961,g:0,b:0},mediumaquamarine:{r:.4,g:.803922,b:.666667},mediumblue:{r:0,g:0,b:.803922},mediumorchid:{r:.729412,g:.333333,b:.827451},mediumpurple:{r:.576471,g:.439216,b:.858824},mediumseagreen:{r:.235294,g:.701961,b:.443137},mediumslateblue:{r:.482353,g:.407843,b:.933333},mediumspringgreen:{r:0,g:.980392,b:.603922},mediumturquoise:{r:.282353,g:.819608,b:.8},mediumvioletred:{r:.780392,g:.082353,b:.521569},midnightblue:{r:.098039,g:.098039,b:.439216},mintcream:{r:.960784,g:1,b:.980392},mistyrose:{r:1,g:.894118,b:.882353},moccasin:{r:1,g:.894118,b:.709804},navajowhite:{r:1,g:.870588,b:.678431},navy:{r:0,g:0,b:.501961},oldlace:{r:.992157,g:.960784,b:.901961},olive:{r:.501961,g:.501961,b:0},olivedrab:{r:.419608,g:.556863,b:.137255},orange:{r:1,g:.647059,b:0},orangered:{r:1,g:.270588,b:0},orchid:{r:.854902,g:.439216,b:.839216},palegoldenrod:{r:.933333,g:.909804,b:.666667},palegreen:{r:.596078,g:.984314,b:.596078},paleturquoise:{r:.686275,g:.933333,b:.933333},palevioletred:{r:.858824,g:.439216,b:.576471},papayawhip:{r:1,g:.937255,b:.835294},peachpuff:{r:1,g:.854902,b:.72549},peru:{r:.803922,g:.521569,b:.247059},pink:{r:1,g:.752941,b:.796078},plum:{r:.866667,g:.627451,b:.866667},powderblue:{r:.690196,g:.878431,b:.901961},purple:{r:.501961,g:0,b:.501961},red:{r:1,g:0,b:0},rosybrown:{r:.737255,g:.560784,b:.560784},royalblue:{r:.254902,g:.411765,b:.882353},saddlebrown:{r:.545098,g:.270588,b:.07451},salmon:{r:.980392,g:.501961,b:.447059},sandybrown:{r:.956863,g:.643137,b:.376471},seagreen:{r:.180392,g:.545098,b:.341176},seashell:{r:1,g:.960784,b:.933333},sienna:{r:.627451,g:.321569,b:.176471},silver:{r:.752941,g:.752941,b:.752941},skyblue:{r:.529412,g:.807843,b:.921569},slateblue:{r:.415686,g:.352941,b:.803922},slategray:{r:.439216,g:.501961,b:.564706},slategrey:{r:.439216,g:.501961,b:.564706},snow:{r:1,g:.980392,b:.980392},springgreen:{r:0,g:1,b:.498039},steelblue:{r:.27451,g:.509804,b:.705882},tan:{r:.823529,g:.705882,b:.54902},teal:{r:0,g:.501961,b:.501961},thistle:{r:.847059,g:.74902,b:.847059},tomato:{r:1,g:.388235,b:.278431},transparent:{r:0,g:0,b:0,a:0},turquoise:{r:.25098,g:.878431,b:.815686},violet:{r:.933333,g:.509804,b:.933333},wheat:{r:.960784,g:.870588,b:.701961},white:{r:1,g:1,b:1},whitesmoke:{r:.960784,g:.960784,b:.960784},yellow:{r:1,g:1,b:0},yellowgreen:{r:.603922,g:.803922,b:.196078}};const f=/^rgb\(\s*((?:(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*,\s*){2}(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*)\)$/i;const m=/^rgba\(\s*((?:(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*,\s*){3}(?:0|1|0?\.\d*)\s*)\)$/i;const v=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;const $=/^#((?:[0-9a-f]{8}|[0-9a-f]{4}))$/i;function x(e){return v.test(e)}function y(e){return $.test(e)}function w(e){return y(e)}function k(e){return f.test(e)}function C(e){return m.test(e)}function F(e){return b.hasOwnProperty(e)}function S(e){const t=v.exec(e);if(t===null){return null}let o=t[1];if(o.length===3){const e=o.charAt(0);const t=o.charAt(1);const r=o.charAt(2);o=e.concat(e,t,t,r,r)}const r=parseInt(o,16);if(isNaN(r)){return null}return new g(a((r&16711680)>>>16,0,255),a((r&65280)>>>8,0,255),a(r&255,0,255),1)}function T(e){const t=$.exec(e);if(t===null){return null}let o=t[1];if(o.length===4){const e=o.charAt(0);const t=o.charAt(1);const r=o.charAt(2);const a=o.charAt(3);o=e.concat(e,t,t,r,r,a,a)}const r=parseInt(o,16);if(isNaN(r)){return null}return new g(a((r&16711680)>>>16,0,255),a((r&65280)>>>8,0,255),a(r&255,0,255),a((r&4278190080)>>>24,0,255))}function D(e){const t=$.exec(e);if(t===null){return null}let o=t[1];if(o.length===4){const e=o.charAt(0);const t=o.charAt(1);const r=o.charAt(2);const a=o.charAt(3);o=e.concat(e,t,t,r,r,a,a)}const r=parseInt(o,16);if(isNaN(r)){return null}return new ColorRGBA64(normalize((r&4278190080)>>>24,0,255),normalize((r&16711680)>>>16,0,255),normalize((r&65280)>>>8,0,255),normalize(r&255,0,255))}function V(e){const t=f.exec(e);if(t===null){return null}const o=t[1].split(",");return new g(a(Number(o[0]),0,255),a(Number(o[1]),0,255),a(Number(o[2]),0,255),1)}function j(e){const t=m.exec(e);if(t===null){return null}const o=t[1].split(",");if(o.length===4){return new g(a(Number(o[0]),0,255),a(Number(o[1]),0,255),a(Number(o[2]),0,255),Number(o[3]))}return null}function z(e){const t=b[e.toLowerCase()];return t?new g(t.r,t.g,t.b,t.hasOwnProperty("a")?t.a:void 0):null}function B(e){const t=e.toLowerCase();return x(t)?S(t):w(t)?T(t):k(t)?V(t):C(t)?j(t):F(t)?z(t):null}class O{constructor(e,t,o){this.h=e;this.s=t;this.l=o}static fromObject(e){if(e&&!isNaN(e.h)&&!isNaN(e.s)&&!isNaN(e.l)){return new O(e.h,e.s,e.l)}return null}equalValue(e){return this.h===e.h&&this.s===e.s&&this.l===e.l}roundToPrecision(e){return new O(p(this.h,e),p(this.s,e),p(this.l,e))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class L{constructor(e,t,o){this.h=e;this.s=t;this.v=o}static fromObject(e){if(e&&!isNaN(e.h)&&!isNaN(e.s)&&!isNaN(e.v)){return new L(e.h,e.s,e.v)}return null}equalValue(e){return this.h===e.h&&this.s===e.s&&this.v===e.v}roundToPrecision(e){return new L(p(this.h,e),p(this.s,e),p(this.v,e))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class H{constructor(e,t,o){this.l=e;this.a=t;this.b=o}static fromObject(e){if(e&&!isNaN(e.l)&&!isNaN(e.a)&&!isNaN(e.b)){return new H(e.l,e.a,e.b)}return null}equalValue(e){return this.l===e.l&&this.a===e.a&&this.b===e.b}roundToPrecision(e){return new H(p(this.l,e),p(this.a,e),p(this.b,e))}toObject(){return{l:this.l,a:this.a,b:this.b}}}H.epsilon=216/24389;H.kappa=24389/27;class N{constructor(e,t,o){this.l=e;this.c=t;this.h=o}static fromObject(e){if(e&&!isNaN(e.l)&&!isNaN(e.c)&&!isNaN(e.h)){return new N(e.l,e.c,e.h)}return null}equalValue(e){return this.l===e.l&&this.c===e.c&&this.h===e.h}roundToPrecision(e){return new N(p(this.l,e),p(this.c,e),p(this.h,e))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class P{constructor(e,t,o){this.x=e;this.y=t;this.z=o}static fromObject(e){if(e&&!isNaN(e.x)&&!isNaN(e.y)&&!isNaN(e.z)){return new P(e.x,e.y,e.z)}return null}equalValue(e){return this.x===e.x&&this.y===e.y&&this.z===e.z}roundToPrecision(e){return new P(p(this.x,e),p(this.y,e),p(this.z,e))}toObject(){return{x:this.x,y:this.y,z:this.z}}}P.whitePoint=new P(.95047,1,1.08883);function R(e){return e.r*.2126+e.g*.7152+e.b*.0722}function I(e){function t(e){if(e<=.03928){return e/12.92}return Math.pow((e+.055)/1.055,2.4)}return R(new g(t(e.r),t(e.g),t(e.b),1))}const A=(e,t)=>(e+.05)/(t+.05);function M(e,t){const o=I(e);const r=I(t);return o>r?A(o,r):A(r,o)}function G(e,t,o){if(o-t===0){return 0}else{return(e-t)/(o-t)}}function _(e,t,o){const r=G(e.r,t.r,o.r);const a=G(e.g,t.g,o.g);const i=G(e.b,t.b,o.b);return(r+a+i)/3}function E(e,t,o=null){let r=0;let a=o;if(a!==null){r=_(e,t,a)}else{a=new ColorRGBA64(0,0,0,1);r=_(e,t,a);if(r<=0){a=new ColorRGBA64(1,1,1,1);r=_(e,t,a)}}r=Math.round(r*1e3)/1e3;return new ColorRGBA64(a.r,a.g,a.b,r)}function q(e){const t=Math.max(e.r,e.g,e.b);const o=Math.min(e.r,e.g,e.b);const r=t-o;let a=0;if(r!==0){if(t===e.r){a=60*((e.g-e.b)/r%6)}else if(t===e.g){a=60*((e.b-e.r)/r+2)}else{a=60*((e.r-e.g)/r+4)}}if(a<0){a+=360}const i=(t+o)/2;let n=0;if(r!==0){n=r/(1-Math.abs(2*i-1))}return new O(a,n,i)}function W(e,t=1){const o=(1-Math.abs(2*e.l-1))*e.s;const r=o*(1-Math.abs(e.h/60%2-1));const a=e.l-o/2;let i=0;let n=0;let l=0;if(e.h<60){i=o;n=r;l=0}else if(e.h<120){i=r;n=o;l=0}else if(e.h<180){i=0;n=o;l=r}else if(e.h<240){i=0;n=r;l=o}else if(e.h<300){i=r;n=0;l=o}else if(e.h<360){i=o;n=0;l=r}return new g(i+a,n+a,l+a,t)}function U(e){const t=Math.max(e.r,e.g,e.b);const o=Math.min(e.r,e.g,e.b);const r=t-o;let a=0;if(r!==0){if(t===e.r){a=60*((e.g-e.b)/r%6)}else if(t===e.g){a=60*((e.b-e.r)/r+2)}else{a=60*((e.r-e.g)/r+4)}}if(a<0){a+=360}let i=0;if(t!==0){i=r/t}return new L(a,i,t)}function X(e,t=1){const o=e.s*e.v;const r=o*(1-Math.abs(e.h/60%2-1));const a=e.v-o;let i=0;let n=0;let l=0;if(e.h<60){i=o;n=r;l=0}else if(e.h<120){i=r;n=o;l=0}else if(e.h<180){i=0;n=o;l=r}else if(e.h<240){i=0;n=r;l=o}else if(e.h<300){i=r;n=0;l=o}else if(e.h<360){i=o;n=0;l=r}return new g(i+a,n+a,l+a,t)}function Z(e){let t=0;let o=0;if(e.h!==0){t=Math.cos(n(e.h))*e.c;o=Math.sin(n(e.h))*e.c}return new H(e.l,t,o)}function Y(e){let t=0;if(Math.abs(e.b)>.001||Math.abs(e.a)>.001){t=l(Math.atan2(e.b,e.a))}if(t<0){t+=360}const o=Math.sqrt(e.a*e.a+e.b*e.b);return new N(e.l,o,t)}function J(e){const t=(e.l+16)/116;const o=t+e.a/500;const r=t-e.b/200;const a=Math.pow(o,3);const i=Math.pow(t,3);const n=Math.pow(r,3);let l=0;if(a>H.epsilon){l=a}else{l=(116*o-16)/H.kappa}let s=0;if(e.l>H.epsilon*H.kappa){s=i}else{s=e.l/H.kappa}let c=0;if(n>H.epsilon){c=n}else{c=(116*r-16)/H.kappa}l=P.whitePoint.x*l;s=P.whitePoint.y*s;c=P.whitePoint.z*c;return new P(l,s,c)}function K(e){function t(e){if(e>H.epsilon){return Math.pow(e,1/3)}return(H.kappa*e+16)/116}const o=t(e.x/P.whitePoint.x);const r=t(e.y/P.whitePoint.y);const a=t(e.z/P.whitePoint.z);const i=116*r-16;const n=500*(o-r);const l=200*(r-a);return new H(i,n,l)}function Q(e){function t(e){if(e<=.04045){return e/12.92}return Math.pow((e+.055)/1.055,2.4)}const o=t(e.r);const r=t(e.g);const a=t(e.b);const i=o*.4124564+r*.3575761+a*.1804375;const n=o*.2126729+r*.7151522+a*.072175;const l=o*.0193339+r*.119192+a*.9503041;return new P(i,n,l)}function ee(e,t=1){function o(e){if(e<=.0031308){return e*12.92}return 1.055*Math.pow(e,1/2.4)-.055}const r=o(e.x*3.2404542-e.y*1.5371385-e.z*.4985314);const a=o(e.x*-.969266+e.y*1.8760108+e.z*.041556);const i=o(e.x*.0556434-e.y*.2040259+e.z*1.0572252);return new g(r,a,i,t)}function te(e){return K(Q(e))}function oe(e,t=1){return ee(J(e),t)}function re(e){return Y(te(e))}function ae(e,t=1){return oe(Z(e),t)}function ie(e,t=1){let o=0;let r=0;let a=0;if(e<=1e3){e=1e3}else if(e>=4e4){e=4e4}if(e<6600){o=255;r=e/100-2;r=-155.25485562709179-.44596950469579133*r+104.49216199393888*Math.log(r)}else{o=e/100-55;o=351.97690566805693+.114206453784165*o-40.25366309332127*Math.log(o);r=e/100-50;r=325.4494125711974+.07943456536662342*r-28.0852963507957*Math.log(r)}if(e>=6600){a=255}else if(e<2e3){a=0}else{a=e/100-10;a=-254.76935184120902+.8274096064007395*a+115.67994401066147*Math.log(a)}return new ColorRGBA64(o/255,r/255,a/255,t)}function ne(e){let t=0;let o=1e3;let r=4e4;while(r-o>.4){t=(r+o)/2;const a=ie(t);if(a.b/a.r>=e.b/e.r){r=t}else{o=t}}return Math.round(t)}function le(e,t){const o=e.relativeLuminance>t.relativeLuminance?e:t;const r=e.relativeLuminance>t.relativeLuminance?t:e;return(o.relativeLuminance+.05)/(r.relativeLuminance+.05)}const se=Object.freeze({create(e,t,o){return new de(e,t,o)},from(e){return new de(e.r,e.g,e.b)}});function ce(e){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const o in t){if(typeof t[o]!==typeof e[o]){return false}}return true}class de extends g{constructor(e,t,o){super(e,t,o,1);this.toColorString=this.toStringHexRGB;this.contrast=le.bind(null,this);this.createCSS=this.toColorString;this.relativeLuminance=I(this)}static fromObject(e){return new de(e.r,e.g,e.b)}}function ue(e){return se.create(e,e,e)}const he={LightMode:1,DarkMode:.23};const pe=(-.1+Math.sqrt(.21))/2;function ge(e){return e.relativeLuminance<=pe}var be=o(63073);var fe=o(30086);function me(e,t,o=18){const r=re(e);let a=r.c+t*o;if(a<0){a=0}return ae(new N(r.l,a,r.h))}function ve(e,t,o=18){return me(e,-1*t,o)}function $e(e,t,o=18){const r=rgbToLAB(e);const a=r.l-t*o;return labToRGB(new ColorLAB(a,r.a,r.b))}function xe(e,t,o=18){return $e(e,-1*t,o)}function ye(e,t){if(t===0){return 0}return 1-(1-e)/t}function we(e,t){return new ColorRGBA64(ye(e.r,t.r),ye(e.g,t.g),ye(e.b,t.b),1)}function ke(e,t){const o=rgbToHSL(e);const r=rgbToHSL(t);if(r.s===0){return new ColorRGBA64(o.l,o.l,o.l,1)}return hslToRGB(new ColorHSL(r.h,r.s,o.l))}function Ce(e,t){return Math.min(e,t)}function Fe(e,t){return new ColorRGBA64(Ce(e.r,t.r),Ce(e.g,t.g),Ce(e.b,t.b),1)}function Se(e,t){if(t>=1){return 1}const o=e/(1-t);if(o>=1){return 1}return o}function Te(e,t){return new ColorRGBA64(Se(e.r,t.r),Se(e.g,t.g),Se(e.b,t.b),1)}function De(e,t){return Math.max(e,t)}function Ve(e,t){return new ColorRGBA64(De(e.r,t.r),De(e.g,t.g),De(e.b,t.b),1)}function je(e,t){return e*t}function ze(e,t){return new g(je(e.r,t.r),je(e.g,t.g),je(e.b,t.b),1)}function Be(e,t){if(e<.5){return r(2*t*e,0,1)}return r(1-2*(1-t)*(1-e),0,1)}function Oe(e,t){return new g(Be(e.r,t.r),Be(e.g,t.g),Be(e.b,t.b),1)}function Le(e,t){return 1-(1-t)*(1-e)}function He(e,t){return new ColorRGBA64(Le(e.r,t.r),Le(e.g,t.g),Le(e.b,t.b),1)}var Ne;(function(e){e[e["Burn"]=0]="Burn";e[e["Color"]=1]="Color";e[e["Darken"]=2]="Darken";e[e["Dodge"]=3]="Dodge";e[e["Lighten"]=4]="Lighten";e[e["Multiply"]=5]="Multiply";e[e["Overlay"]=6]="Overlay";e[e["Screen"]=7]="Screen"})(Ne||(Ne={}));function Pe(e,t,o){switch(e){case Ne.Burn:return we(t,o);case Ne.Color:return ke(t,o);case Ne.Darken:return Fe(t,o);case Ne.Dodge:return Te(t,o);case Ne.Lighten:return Ve(t,o);case Ne.Multiply:return ze(t,o);case Ne.Overlay:return Oe(t,o);case Ne.Screen:return He(t,o);default:throw new Error("Unknown blend mode")}}function Re(e,t){if(t.a>=1){return t}else if(t.a<=0){return new ColorRGBA64(e.r,e.g,e.b,1)}const o=t.a*t.r+(1-t.a)*e.r;const r=t.a*t.g+(1-t.a)*e.g;const a=t.a*t.b+(1-t.a)*e.b;return new ColorRGBA64(o,r,a,1)}function Ie(e,t,o){if(isNaN(e)||e<=0){return t}else if(e>=1){return o}return new g(c(e,t.r,o.r),c(e,t.g,o.g),c(e,t.b,o.b),c(e,t.a,o.a))}function Ae(e,t,o){if(isNaN(e)||e<=0){return t}else if(e>=1){return o}return new O(d(e,t.h,o.h),c(e,t.s,o.s),c(e,t.l,o.l))}function Me(e,t,o){if(isNaN(e)||e<=0){return t}else if(e>=1){return o}return new L(d(e,t.h,o.h),c(e,t.s,o.s),c(e,t.v,o.v))}function Ge(e,t,o){if(isNaN(e)||e<=0){return t}else if(e>=1){return o}return new P(c(e,t.x,o.x),c(e,t.y,o.y),c(e,t.z,o.z))}function _e(e,t,o){if(isNaN(e)||e<=0){return t}else if(e>=1){return o}return new H(c(e,t.l,o.l),c(e,t.a,o.a),c(e,t.b,o.b))}function Ee(e,t,o){if(isNaN(e)||e<=0){return t}else if(e>=1){return o}return new N(c(e,t.l,o.l),c(e,t.c,o.c),d(e,t.h,o.h))}var qe;(function(e){e[e["RGB"]=0]="RGB";e[e["HSL"]=1]="HSL";e[e["HSV"]=2]="HSV";e[e["XYZ"]=3]="XYZ";e[e["LAB"]=4]="LAB";e[e["LCH"]=5]="LCH"})(qe||(qe={}));function We(e,t,o,r){if(isNaN(e)||e<=0){return o}else if(e>=1){return r}switch(t){case qe.HSL:return W(Ae(e,q(o),q(r)));case qe.HSV:return X(Me(e,U(o),U(r)));case qe.XYZ:return ee(Ge(e,Q(o),Q(r)));case qe.LAB:return oe(_e(e,te(o),te(r)));case qe.LCH:return ae(Ee(e,re(o),re(r)));default:return Ie(e,o,r)}}class Ue{constructor(e){if(e==null||e.length===0){throw new Error("The stops argument must be non-empty")}else{this.stops=this.sortColorScaleStops(e)}}static createBalancedColorScale(e){if(e==null||e.length===0){throw new Error("The colors argument must be non-empty")}const t=new Array(e.length);for(let o=0;o<e.length;o++){if(o===0){t[o]={color:e[o],position:0}}else if(o===e.length-1){t[o]={color:e[o],position:1}}else{t[o]={color:e[o],position:o*(1/(e.length-1))}}}return new Ue(t)}getColor(e,t=qe.RGB){if(this.stops.length===1){return this.stops[0].color}else if(e<=0){return this.stops[0].color}else if(e>=1){return this.stops[this.stops.length-1].color}let o=0;for(let i=0;i<this.stops.length;i++){if(this.stops[i].position<=e){o=i}}let r=o+1;if(r>=this.stops.length){r=this.stops.length-1}const a=(e-this.stops[o].position)*(1/(this.stops[r].position-this.stops[o].position));return We(a,t,this.stops[o].color,this.stops[r].color)}trim(e,t,o=qe.RGB){if(e<0||t>1||t<e){throw new Error("Invalid bounds")}if(e===t){return new Ue([{color:this.getColor(e,o),position:0}])}const r=[];for(let n=0;n<this.stops.length;n++){if(this.stops[n].position>=e&&this.stops[n].position<=t){r.push(this.stops[n])}}if(r.length===0){return new Ue([{color:this.getColor(e),position:e},{color:this.getColor(t),position:t}])}if(r[0].position!==e){r.unshift({color:this.getColor(e),position:e})}if(r[r.length-1].position!==t){r.push({color:this.getColor(t),position:t})}const a=t-e;const i=new Array(r.length);for(let n=0;n<r.length;n++){i[n]={color:r[n].color,position:(r[n].position-e)/a}}return new Ue(i)}findNextColor(e,t,o=false,r=qe.RGB,a=.005,i=32){if(isNaN(e)||e<=0){e=0}else if(e>=1){e=1}const n=this.getColor(e,r);const l=o?0:1;const s=this.getColor(l,r);const c=M(n,s);if(c<=t){return l}let d=o?0:e;let u=o?e:0;let h=l;let p=0;while(p<=i){h=Math.abs(u-d)/2+d;const e=this.getColor(h,r);const i=M(n,e);if(Math.abs(i-t)<=a){return h}else if(i>t){if(o){d=h}else{u=h}}else{if(o){u=h}else{d=h}}p++}return h}clone(){const e=new Array(this.stops.length);for(let t=0;t<e.length;t++){e[t]={color:this.stops[t].color,position:this.stops[t].position}}return new Ue(e)}sortColorScaleStops(e){return e.sort(((e,t)=>{const o=e.position;const r=t.position;if(o<r){return-1}else if(o>r){return 1}else{return 0}}))}}class Xe{constructor(e){this.config=Object.assign({},Xe.defaultPaletteConfig,e);this.palette=[];this.updatePaletteColors()}updatePaletteGenerationValues(e){let t=false;for(const o in e){if(this.config[o]){if(this.config[o].equalValue){if(!this.config[o].equalValue(e[o])){this.config[o]=e[o];t=true}}else{if(e[o]!==this.config[o]){this.config[o]=e[o];t=true}}}}if(t){this.updatePaletteColors()}return t}updatePaletteColors(){const e=this.generatePaletteColorScale();for(let t=0;t<this.config.steps;t++){this.palette[t]=e.getColor(t/(this.config.steps-1),this.config.interpolationMode)}}generatePaletteColorScale(){const e=q(this.config.baseColor);const t=new Ue([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]);const o=t.trim(this.config.clipLight,1-this.config.clipDark);const r=o.getColor(0);const a=o.getColor(1);let i=r;let n=a;if(e.s>=this.config.saturationAdjustmentCutoff){i=me(i,this.config.saturationLight);n=me(n,this.config.saturationDark)}if(this.config.multiplyLight!==0){const e=ze(this.config.baseColor,i);i=We(this.config.multiplyLight,this.config.interpolationMode,i,e)}if(this.config.multiplyDark!==0){const e=ze(this.config.baseColor,n);n=We(this.config.multiplyDark,this.config.interpolationMode,n,e)}if(this.config.overlayLight!==0){const e=Oe(this.config.baseColor,i);i=We(this.config.overlayLight,this.config.interpolationMode,i,e)}if(this.config.overlayDark!==0){const e=Oe(this.config.baseColor,n);n=We(this.config.overlayDark,this.config.interpolationMode,n,e)}if(this.config.baseScalePosition){if(this.config.baseScalePosition<=0){return new Ue([{position:0,color:this.config.baseColor},{position:1,color:n.clamp()}])}else if(this.config.baseScalePosition>=1){return new Ue([{position:0,color:i.clamp()},{position:1,color:this.config.baseColor}])}return new Ue([{position:0,color:i.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:n.clamp()}])}return new Ue([{position:0,color:i.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:n.clamp()}])}}Xe.defaultPaletteConfig={baseColor:S("#808080"),steps:11,interpolationMode:qe.RGB,scaleColorLight:new g(1,1,1,1),scaleColorDark:new g(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};Xe.greyscalePaletteConfig={baseColor:S("#808080"),steps:11,interpolationMode:qe.RGB,scaleColorLight:new g(1,1,1,1),scaleColorDark:new g(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};function Ze(e,t){const o=rgbToHSL(e);let r=Number.MAX_VALUE;let a=0;for(let i=0;i<t.length;i++){const e=rgbToHSL(t[i]);const n=Math.abs(e.l-o.l);if(n<r){r=n;a=i}}return a}function Ye(e,t,o=Xe.greyscalePaletteConfig,r=Xe.defaultPaletteConfig){const a=new Xe(Object.assign(Object.assign({},o),{steps:t}));const i=Ze(e,a.palette);return new Xe(Object.assign(Object.assign({},r),{steps:t,baseColor:e,baseScalePosition:i/(t-1)}))}function Je(e,t,o){if(e.length<=1||t<=1){throw new Error("The input array and targetSize must both be greater than 1")}if(o&&t<=e.length){throw new Error("If preserveInputColors is true then targetSize must be greater than the length of the input array")}const r=new Array(e.length);if(o){for(let o=0;o<e.length;o++){const a=o/(e.length-1);let i=2;let n=0;for(let e=0;e<t;e++){const o=Math.abs(e/(t-1)-a);if(o<i){i=o;n=e}if(o===0){break}}r[o]={color:e[o],position:n/(t-1)}}}else{for(let t=0;t<r.length;t++){r[t]={color:e[t],position:t/(e.length-1)}}}const a=new ColorScale(r);const i=new Array(t);for(let n=0;n<t;n++){i[n]=a.getColor(n/(t-1))}return i}const Ke={targetSize:63,spacing:4,scaleColorLight:Xe.defaultPaletteConfig.scaleColorLight,scaleColorDark:Xe.defaultPaletteConfig.scaleColorDark};function Qe(e,t=Ke){if(e.length===0){return[]}const o=Math.floor((t.targetSize-((e.length-1)*t.spacing+1))/2);if(o<0){throw new Error("(targetSize - ((input.length - 1) * spacing + 1)) / 2 must be >= 0")}const r=new Array(e.length+2);r[0]={position:0,color:t.scaleColorLight};r[r.length-1]={position:1,color:t.scaleColorDark};for(let n=0;n<e.length;n++){r[n+1]={color:e[n],position:(n*t.spacing+o)/(t.targetSize-1)}}const a=new ColorScale(r);const i=new Array(t.targetSize);for(let n=0;n<t.targetSize;n++){i[n]=a.getColor(n/(t.targetSize-1))}return i}function et(e,t=11,o=Ke){const r=Ye(e,t);const a=Qe(r.palette,o);return{short:r.palette,long:a}}class tt{constructor(e){this.palette=[];this.config=Object.assign({},tt.defaultPaletteConfig,e);this.regenPalettes()}regenPalettes(){let e=this.config.steps;if(isNaN(e)||e<3){e=3}const t=.14;const o=.06;const r=new g(t,t,t,1);const a=94;const i=new Xe(Object.assign(Object.assign({},Xe.greyscalePaletteConfig),{baseColor:r,baseScalePosition:(1-t)*100/a,steps:e}));const n=i.palette;const l=R(this.config.baseColor);const s=q(this.config.baseColor).l;const c=(l+s)/2;const d=this.matchRelativeLuminanceIndex(c,n);const u=d/(e-1);const h=this.matchRelativeLuminanceIndex(t,n);const p=h/(e-1);const b=q(this.config.baseColor);const f=W(O.fromObject({h:b.h,s:b.s,l:t}));const m=W(O.fromObject({h:b.h,s:b.s,l:o}));const v=new Array(5);v[0]={position:0,color:new g(1,1,1,1)};v[1]={position:u,color:this.config.baseColor};v[2]={position:p,color:f};v[3]={position:.99,color:m};v[4]={position:1,color:new g(0,0,0,1)};const $=new Ue(v);this.palette=new Array(e);for(let g=0;g<e;g++){const t=$.getColor(g/(e-1),qe.RGB);this.palette[g]=t}}matchRelativeLuminanceIndex(e,t){let o=Number.MAX_VALUE;let r=0;let a=0;const i=t.length;for(;a<i;a++){const i=Math.abs(R(t[a])-e);if(i<o){o=i;r=a}}return r}}tt.defaultPaletteConfig={baseColor:S("#808080"),steps:94};function ot(e,t,o=0,r=e.length-1){if(r===o){return e[o]}const a=Math.floor((r-o)/2)+o;return t(e[a])?ot(e,t,o,a):ot(e,t,a+1,r)}function rt(e){return ge(e)?-1:1}function at(e,t,o){if(typeof e==="number"){return nt.from(se.create(e,t,o))}else{return nt.from(e)}}function it(e){return ce(e)?lt.from(e):lt.from(se.create(e.r,e.g,e.b))}const nt=Object.freeze({create:at,from:it});class lt{constructor(e,t){this.closestIndexCache=new Map;this.source=e;this.swatches=t;this.reversedSwatches=Object.freeze([...this.swatches].reverse());this.lastIndex=this.swatches.length-1}colorContrast(e,t,o,r){if(o===undefined){o=this.closestIndexOf(e)}let a=this.swatches;const i=this.lastIndex;let n=o;if(r===undefined){r=rt(e)}const l=o=>le(e,o)>=t;if(r===-1){a=this.reversedSwatches;n=i-n}return ot(a,l,n,i)}get(e){return this.swatches[e]||this.swatches[r(e,0,this.lastIndex)]}closestIndexOf(e){if(this.closestIndexCache.has(e.relativeLuminance)){return this.closestIndexCache.get(e.relativeLuminance)}let t=this.swatches.indexOf(e);if(t!==-1){this.closestIndexCache.set(e.relativeLuminance,t);return t}const o=this.swatches.reduce(((t,o)=>Math.abs(o.relativeLuminance-e.relativeLuminance)<Math.abs(t.relativeLuminance-e.relativeLuminance)?o:t));t=this.swatches.indexOf(o);this.closestIndexCache.set(e.relativeLuminance,t);return t}static from(e){return new lt(e,Object.freeze(new tt({baseColor:g.fromObject(e)}).palette.map((e=>{const t=S(e.toStringHexRGB());return se.create(t.r,t.g,t.b)}))))}}function st(e,t,o,r,a,i,n,l,s){const c=e.source;const d=t.closestIndexOf(o);const u=Math.max(n,l,s);const h=d>=u?-1:1;const p=e.closestIndexOf(c);const g=p;const b=g+h*-1*r;const f=b+h*a;const m=b+h*i;return{rest:e.get(b),hover:e.get(g),active:e.get(f),focus:e.get(m)}}function ct(e,t,o,r,a,i,n){const l=e.source;const s=e.closestIndexOf(l);const c=rt(t);const d=s+(c===1?Math.min(r,a):Math.max(c*r,c*a));const u=e.colorContrast(t,o,d,c);const h=e.closestIndexOf(u);const p=h+c*Math.abs(r-a);const g=c===1?r<a:c*r>c*a;let b;let f;if(g){b=h;f=p}else{b=p;f=h}return{rest:e.get(b),hover:e.get(f),active:e.get(b+c*i),focus:e.get(b+c*n)}}const dt=se.create(1,1,1);const ut=se.create(0,0,0);const ht=se.from(S("#808080"));const pt=se.from(S("#DA1A5F"));const gt=se.from(S("#D32F2F"));function bt(e,t){return e.contrast(dt)>=t?dt:ut}function ft(e,t,o,r,a,i){const n=e.closestIndexOf(t);const l=Math.max(o,r,a,i);const s=n>=l?-1:1;return{rest:e.get(n+s*o),hover:e.get(n+s*r),active:e.get(n+s*a),focus:e.get(n+s*i)}}function mt(e,t,o,r,a,i){const n=rt(t);const l=e.closestIndexOf(t);return{rest:e.get(l-n*o),hover:e.get(l-n*r),active:e.get(l-n*a),focus:e.get(l-n*i)}}function vt(e,t,o){const r=e.closestIndexOf(t);return e.get(r-(r<o?o*-1:o))}function $t(e,t,o,r,a,i,n,l,s,c){const d=Math.max(o,r,a,i,n,l,s,c);const u=e.closestIndexOf(t);const h=u>=d?-1:1;return{rest:e.get(u+h*o),hover:e.get(u+h*r),active:e.get(u+h*a),focus:e.get(u+h*i)}}function xt(e,t,o,r,a,i){const n=rt(t);const l=e.closestIndexOf(e.colorContrast(t,4.5));const s=l+n*Math.abs(o-r);const c=n===1?o<r:n*o>n*r;let d;let u;if(c){d=l;u=s}else{d=s;u=l}return{rest:e.get(d),hover:e.get(u),active:e.get(d+n*a),focus:e.get(d+n*i)}}function yt(e,t){return e.colorContrast(t,3.5)}function wt(e,t,o){return e.colorContrast(o,3.5,e.closestIndexOf(e.source),rt(t)*-1)}function kt(e,t){return e.colorContrast(t,14)}function Ct(e,t){return e.colorContrast(t,4.5)}function Ft(e,t,o){return e.get(e.closestIndexOf(ue(t))+o)}function St(e,t,o){const r=e.closestIndexOf(ue(t))-o;return e.get(r-o)}function Tt(e,t){return e.get(e.closestIndexOf(ue(t)))}function Dt(e,t,o,r,a,i){return Math.max(e.closestIndexOf(ue(t))+o,r,a,i)}function Vt(e,t,o,r,a,i){return e.get(Dt(e,t,o,r,a,i))}function jt(e,t,o,r,a,i){return e.get(Dt(e,t,o,r,a,i)+o)}function zt(e,t,o,r,a,i){return e.get(Dt(e,t,o,r,a,i)+o*2)}function Bt(e,t,o,r,a,i){const n=e.closestIndexOf(t);const l=rt(t);const s=n+l*o;const c=s+l*(r-o);const d=s+l*(a-o);const u=s+l*(i-o);return{rest:e.get(s),hover:e.get(c),active:e.get(d),focus:e.get(u)}}function Ot(e,t,o){return e.get(e.closestIndexOf(t)+rt(t)*o)}function Lt(e,t,o,r,a,i,n,l,s){const c=e.source;const d=t.closestIndexOf(o);const u=Math.max(n,l,s);const h=d>=u?-1:1;const p=e.closestIndexOf(c);const g=p;const b=g+h*-1*r;const f=b+h*a;const m=b+h*i;return{rest:e.get(b),hover:e.get(g),active:e.get(f),focus:e.get(m)}}function Ht(e,t,o,r,a,i,n){const l=e.source;const s=e.closestIndexOf(l);const c=ge(t)?-1:1;const d=s+(c===1?Math.min(r,a):Math.max(c*r,c*a));const u=e.colorContrast(t,o,d,c);const h=e.closestIndexOf(u);const p=h+c*Math.abs(r-a);const g=c===1?r<a:c*r>c*a;let b;let f;if(g){b=h;f=p}else{b=p;f=h}return{rest:e.get(b),hover:e.get(f),active:e.get(b+c*i),focus:e.get(b+c*n)}}function Nt(e,t){return e.contrast(dt)>=t?dt:ut}const{create:Pt}=be.DesignToken;function Rt(e){return be.DesignToken.create({name:e,cssCustomPropertyName:null})}const It=Pt("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif');const At=Pt("base-height-multiplier").withDefault(10);const Mt=Pt("base-horizontal-spacing-multiplier").withDefault(3);const Gt=Pt("base-layer-luminance").withDefault(he.DarkMode);const _t=Pt("control-corner-radius").withDefault(4);const Et=Pt("density").withDefault(0);const qt=Pt("design-unit").withDefault(4);const Wt=Pt("direction").withDefault(fe.O.ltr);const Ut=Pt("disabled-opacity").withDefault(.4);const Xt=Pt("stroke-width").withDefault(1);const Zt=Pt("focus-stroke-width").withDefault(2);const Yt=Pt("type-ramp-base-font-size").withDefault("14px");const Jt=Pt("type-ramp-base-line-height").withDefault("20px");const Kt=Pt("type-ramp-minus-1-font-size").withDefault("12px");const Qt=Pt("type-ramp-minus-1-line-height").withDefault("16px");const eo=Pt("type-ramp-minus-2-font-size").withDefault("10px");const to=Pt("type-ramp-minus-2-line-height").withDefault("16px");const oo=Pt("type-ramp-plus-1-font-size").withDefault("16px");const ro=Pt("type-ramp-plus-1-line-height").withDefault("24px");const ao=Pt("type-ramp-plus-2-font-size").withDefault("20px");const io=Pt("type-ramp-plus-2-line-height").withDefault("28px");const no=Pt("type-ramp-plus-3-font-size").withDefault("28px");const lo=Pt("type-ramp-plus-3-line-height").withDefault("36px");const so=Pt("type-ramp-plus-4-font-size").withDefault("34px");const co=Pt("type-ramp-plus-4-line-height").withDefault("44px");const uo=Pt("type-ramp-plus-5-font-size").withDefault("46px");const ho=Pt("type-ramp-plus-5-line-height").withDefault("56px");const po=Pt("type-ramp-plus-6-font-size").withDefault("60px");const go=Pt("type-ramp-plus-6-line-height").withDefault("72px");const bo=Rt("accent-fill-rest-delta").withDefault(0);const fo=Rt("accent-fill-hover-delta").withDefault(4);const mo=Rt("accent-fill-active-delta").withDefault(-5);const vo=Rt("accent-fill-focus-delta").withDefault(0);const $o=Rt("accent-foreground-rest-delta").withDefault(0);const xo=Rt("accent-foreground-hover-delta").withDefault(6);const yo=Rt("accent-foreground-active-delta").withDefault(-4);const wo=Rt("accent-foreground-focus-delta").withDefault(0);const ko=Rt("neutral-fill-rest-delta").withDefault(7);const Co=Rt("neutral-fill-hover-delta").withDefault(10);const Fo=Rt("neutral-fill-active-delta").withDefault(5);const So=Rt("neutral-fill-focus-delta").withDefault(0);const To=Rt("neutral-fill-input-rest-delta").withDefault(0);const Do=Rt("neutral-fill-input-hover-delta").withDefault(0);const Vo=Rt("neutral-fill-input-active-delta").withDefault(0);const jo=Rt("neutral-fill-input-focus-delta").withDefault(0);const zo=Rt("neutral-fill-stealth-rest-delta").withDefault(0);const Bo=Rt("neutral-fill-stealth-hover-delta").withDefault(5);const Oo=Rt("neutral-fill-stealth-active-delta").withDefault(3);const Lo=Rt("neutral-fill-stealth-focus-delta").withDefault(0);const Ho=Rt("neutral-fill-strong-rest-delta").withDefault(0);const No=Rt("neutral-fill-strong-hover-delta").withDefault(8);const Po=Rt("neutral-fill-strong-active-delta").withDefault(-5);const Ro=Rt("neutral-fill-strong-focus-delta").withDefault(0);const Io=Rt("neutral-fill-layer-rest-delta").withDefault(3);const Ao=Rt("neutral-stroke-rest-delta").withDefault(25);const Mo=Rt("neutral-stroke-hover-delta").withDefault(40);const Go=Rt("neutral-stroke-active-delta").withDefault(16);const _o=Rt("neutral-stroke-focus-delta").withDefault(25);const Eo=Rt("neutral-stroke-divider-rest-delta").withDefault(8);const qo=Pt("neutral-color").withDefault(ht);const Wo=Rt("neutral-palette").withDefault((e=>nt.from(qo.getValueFor(e))));const Uo=Pt("accent-color").withDefault(pt);const Xo=Rt("accent-palette").withDefault((e=>nt.from(Uo.getValueFor(e))));const Zo=Rt("neutral-layer-card-container-recipe").withDefault({evaluate:e=>Ft(Wo.getValueFor(e),Gt.getValueFor(e),Io.getValueFor(e))});const Yo=Pt("neutral-layer-card-container").withDefault((e=>Zo.getValueFor(e).evaluate(e)));const Jo=Rt("neutral-layer-floating-recipe").withDefault({evaluate:e=>St(Wo.getValueFor(e),Gt.getValueFor(e),Io.getValueFor(e))});const Ko=Pt("neutral-layer-floating").withDefault((e=>Jo.getValueFor(e).evaluate(e)));const Qo=Rt("neutral-layer-1-recipe").withDefault({evaluate:e=>Tt(Wo.getValueFor(e),Gt.getValueFor(e))});const er=Pt("neutral-layer-1").withDefault((e=>Qo.getValueFor(e).evaluate(e)));const tr=Rt("neutral-layer-2-recipe").withDefault({evaluate:e=>Vt(Wo.getValueFor(e),Gt.getValueFor(e),Io.getValueFor(e),ko.getValueFor(e),Co.getValueFor(e),Fo.getValueFor(e))});const or=Pt("neutral-layer-2").withDefault((e=>tr.getValueFor(e).evaluate(e)));const rr=Rt("neutral-layer-3-recipe").withDefault({evaluate:e=>jt(Wo.getValueFor(e),Gt.getValueFor(e),Io.getValueFor(e),ko.getValueFor(e),Co.getValueFor(e),Fo.getValueFor(e))});const ar=Pt("neutral-layer-3").withDefault((e=>rr.getValueFor(e).evaluate(e)));const ir=Rt("neutral-layer-4-recipe").withDefault({evaluate:e=>zt(Wo.getValueFor(e),Gt.getValueFor(e),Io.getValueFor(e),ko.getValueFor(e),Co.getValueFor(e),Fo.getValueFor(e))});const nr=Pt("neutral-layer-4").withDefault((e=>ir.getValueFor(e).evaluate(e)));const lr=Pt("fill-color").withDefault((e=>er.getValueFor(e)));var sr;(function(e){e[e["normal"]=4.5]="normal";e[e["large"]=7]="large"})(sr||(sr={}));const cr=Pt({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>st(Xo.getValueFor(e),Wo.getValueFor(e),t||lr.getValueFor(e),fo.getValueFor(e),mo.getValueFor(e),vo.getValueFor(e),ko.getValueFor(e),Co.getValueFor(e),Fo.getValueFor(e))});const dr=Pt("accent-fill-rest").withDefault((e=>cr.getValueFor(e).evaluate(e).rest));const ur=Pt("accent-fill-hover").withDefault((e=>cr.getValueFor(e).evaluate(e).hover));const hr=Pt("accent-fill-active").withDefault((e=>cr.getValueFor(e).evaluate(e).active));const pr=Pt("accent-fill-focus").withDefault((e=>cr.getValueFor(e).evaluate(e).focus));const gr=e=>(t,o)=>bt(o||dr.getValueFor(t),e);const br=Rt("foreground-on-accent-recipe").withDefault({evaluate:(e,t)=>gr(sr.normal)(e,t)});const fr=Pt("foreground-on-accent-rest").withDefault((e=>br.getValueFor(e).evaluate(e,dr.getValueFor(e))));const mr=Pt("foreground-on-accent-hover").withDefault((e=>br.getValueFor(e).evaluate(e,ur.getValueFor(e))));const vr=Pt("foreground-on-accent-active").withDefault((e=>br.getValueFor(e).evaluate(e,hr.getValueFor(e))));const $r=Pt("foreground-on-accent-focus").withDefault((e=>br.getValueFor(e).evaluate(e,pr.getValueFor(e))));const xr=Rt("foreground-on-accent-large-recipe").withDefault({evaluate:(e,t)=>gr(sr.large)(e,t)});const yr=Pt("foreground-on-accent-rest-large").withDefault((e=>xr.getValueFor(e).evaluate(e,dr.getValueFor(e))));const wr=Pt("foreground-on-accent-hover-large").withDefault((e=>xr.getValueFor(e).evaluate(e,ur.getValueFor(e))));const kr=Pt("foreground-on-accent-active-large").withDefault((e=>xr.getValueFor(e).evaluate(e,hr.getValueFor(e))));const Cr=Pt("foreground-on-accent-focus-large").withDefault((e=>xr.getValueFor(e).evaluate(e,pr.getValueFor(e))));const Fr=e=>(t,o)=>ct(Xo.getValueFor(t),o||lr.getValueFor(t),e,$o.getValueFor(t),xo.getValueFor(t),yo.getValueFor(t),wo.getValueFor(t));const Sr=Pt({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Fr(sr.normal)(e,t)});const Tr=Pt("accent-foreground-rest").withDefault((e=>Sr.getValueFor(e).evaluate(e).rest));const Dr=Pt("accent-foreground-hover").withDefault((e=>Sr.getValueFor(e).evaluate(e).hover));const Vr=Pt("accent-foreground-active").withDefault((e=>Sr.getValueFor(e).evaluate(e).active));const jr=Pt("accent-foreground-focus").withDefault((e=>Sr.getValueFor(e).evaluate(e).focus));const zr=Pt({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>ft(Wo.getValueFor(e),t||lr.getValueFor(e),ko.getValueFor(e),Co.getValueFor(e),Fo.getValueFor(e),So.getValueFor(e))});const Br=Pt("neutral-fill-rest").withDefault((e=>zr.getValueFor(e).evaluate(e).rest));const Or=Pt("neutral-fill-hover").withDefault((e=>zr.getValueFor(e).evaluate(e).hover));const Lr=Pt("neutral-fill-active").withDefault((e=>zr.getValueFor(e).evaluate(e).active));const Hr=Pt("neutral-fill-focus").withDefault((e=>zr.getValueFor(e).evaluate(e).focus));const Nr=Pt({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>mt(Wo.getValueFor(e),t||lr.getValueFor(e),To.getValueFor(e),Do.getValueFor(e),Vo.getValueFor(e),jo.getValueFor(e))});const Pr=Pt("neutral-fill-input-rest").withDefault((e=>Nr.getValueFor(e).evaluate(e).rest));const Rr=Pt("neutral-fill-input-hover").withDefault((e=>Nr.getValueFor(e).evaluate(e).hover));const Ir=Pt("neutral-fill-input-active").withDefault((e=>Nr.getValueFor(e).evaluate(e).active));const Ar=Pt("neutral-fill-input-focus").withDefault((e=>Nr.getValueFor(e).evaluate(e).focus));const Mr=Pt({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>$t(Wo.getValueFor(e),t||lr.getValueFor(e),zo.getValueFor(e),Bo.getValueFor(e),Oo.getValueFor(e),Lo.getValueFor(e),ko.getValueFor(e),Co.getValueFor(e),Fo.getValueFor(e),So.getValueFor(e))});const Gr=Pt("neutral-fill-stealth-rest").withDefault((e=>Mr.getValueFor(e).evaluate(e).rest));const _r=Pt("neutral-fill-stealth-hover").withDefault((e=>Mr.getValueFor(e).evaluate(e).hover));const Er=Pt("neutral-fill-stealth-active").withDefault((e=>Mr.getValueFor(e).evaluate(e).active));const qr=Pt("neutral-fill-stealth-focus").withDefault((e=>Mr.getValueFor(e).evaluate(e).focus));const Wr=Pt({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>xt(Wo.getValueFor(e),t||lr.getValueFor(e),Ho.getValueFor(e),No.getValueFor(e),Po.getValueFor(e),Ro.getValueFor(e))});const Ur=Pt("neutral-fill-strong-rest").withDefault((e=>Wr.getValueFor(e).evaluate(e).rest));const Xr=Pt("neutral-fill-strong-hover").withDefault((e=>Wr.getValueFor(e).evaluate(e).hover));const Zr=Pt("neutral-fill-strong-active").withDefault((e=>Wr.getValueFor(e).evaluate(e).active));const Yr=Pt("neutral-fill-strong-focus").withDefault((e=>Wr.getValueFor(e).evaluate(e).focus));const Jr=Rt("neutral-fill-layer-recipe").withDefault({evaluate:(e,t)=>vt(Wo.getValueFor(e),t||lr.getValueFor(e),Io.getValueFor(e))});const Kr=Pt("neutral-fill-layer-rest").withDefault((e=>Jr.getValueFor(e).evaluate(e)));const Qr=Rt("focus-stroke-outer-recipe").withDefault({evaluate:e=>yt(Wo.getValueFor(e),lr.getValueFor(e))});const ea=Pt("focus-stroke-outer").withDefault((e=>Qr.getValueFor(e).evaluate(e)));const ta=Rt("focus-stroke-inner-recipe").withDefault({evaluate:e=>wt(Xo.getValueFor(e),lr.getValueFor(e),ea.getValueFor(e))});const oa=Pt("focus-stroke-inner").withDefault((e=>ta.getValueFor(e).evaluate(e)));const ra=Rt("neutral-foreground-hint-recipe").withDefault({evaluate:e=>Ct(Wo.getValueFor(e),lr.getValueFor(e))});const aa=Pt("neutral-foreground-hint").withDefault((e=>ra.getValueFor(e).evaluate(e)));const ia=Rt("neutral-foreground-recipe").withDefault({evaluate:e=>kt(Wo.getValueFor(e),lr.getValueFor(e))});const na=Pt("neutral-foreground-rest").withDefault((e=>ia.getValueFor(e).evaluate(e)));const la=Pt({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:e=>Bt(Wo.getValueFor(e),lr.getValueFor(e),Ao.getValueFor(e),Mo.getValueFor(e),Go.getValueFor(e),_o.getValueFor(e))});const sa=Pt("neutral-stroke-rest").withDefault((e=>la.getValueFor(e).evaluate(e).rest));const ca=Pt("neutral-stroke-hover").withDefault((e=>la.getValueFor(e).evaluate(e).hover));const da=Pt("neutral-stroke-active").withDefault((e=>la.getValueFor(e).evaluate(e).active));const ua=Pt("neutral-stroke-focus").withDefault((e=>la.getValueFor(e).evaluate(e).focus));const ha=Rt("neutral-stroke-divider-recipe").withDefault({evaluate:(e,t)=>Ot(Wo.getValueFor(e),t||lr.getValueFor(e),Eo.getValueFor(e))});const pa=Pt("neutral-stroke-divider-rest").withDefault((e=>ha.getValueFor(e).evaluate(e)));const ga=be.DesignToken.create({name:"height-number",cssCustomPropertyName:null}).withDefault((e=>(At.getValueFor(e)+Et.getValueFor(e))*qt.getValueFor(e)));const ba=Pt("error-color").withDefault(gt);const fa=Rt("error-palette").withDefault((e=>nt.from(ba.getValueFor(e))));const ma=Pt({name:"error-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Lt(fa.getValueFor(e),Wo.getValueFor(e),t||lr.getValueFor(e),fo.getValueFor(e),mo.getValueFor(e),vo.getValueFor(e),ko.getValueFor(e),Co.getValueFor(e),Fo.getValueFor(e))});const va=Pt("error-fill-rest").withDefault((e=>ma.getValueFor(e).evaluate(e).rest));const $a=Pt("error-fill-hover").withDefault((e=>ma.getValueFor(e).evaluate(e).hover));const xa=Pt("error-fill-active").withDefault((e=>ma.getValueFor(e).evaluate(e).active));const ya=Pt("error-fill-focus").withDefault((e=>ma.getValueFor(e).evaluate(e).focus));const wa=e=>(t,o)=>Nt(o||va.getValueFor(t),e);const ka=Pt({name:"foreground-on-error-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>wa(sr.normal)(e,t)});const Ca=Pt("foreground-on-error-rest").withDefault((e=>ka.getValueFor(e).evaluate(e,va.getValueFor(e))));const Fa=Pt("foreground-on-error-hover").withDefault((e=>ka.getValueFor(e).evaluate(e,$a.getValueFor(e))));const Sa=Pt("foreground-on-error-active").withDefault((e=>ka.getValueFor(e).evaluate(e,xa.getValueFor(e))));const Ta=Pt("foreground-on-error-focus").withDefault((e=>ka.getValueFor(e).evaluate(e,ya.getValueFor(e))));const Da=Pt({name:"foreground-on-error-large-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>wa(sr.large)(e,t)});const Va=Pt("foreground-on-error-rest-large").withDefault((e=>Da.getValueFor(e).evaluate(e,va.getValueFor(e))));const ja=Pt("foreground-on-error-hover-large").withDefault((e=>Da.getValueFor(e).evaluate(e,$a.getValueFor(e))));const za=Pt("foreground-on-error-active-large").withDefault((e=>Da.getValueFor(e).evaluate(e,xa.getValueFor(e))));const Ba=Pt("foreground-on-error-focus-large").withDefault((e=>Da.getValueFor(e).evaluate(e,ya.getValueFor(e))));const Oa=e=>(t,o)=>Ht(fa.getValueFor(t),o||lr.getValueFor(t),e,$o.getValueFor(t),xo.getValueFor(t),yo.getValueFor(t),wo.getValueFor(t));const La=Pt({name:"error-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Oa(sr.normal)(e,t)});const Ha=Pt("error-foreground-rest").withDefault((e=>La.getValueFor(e).evaluate(e).rest));const Na=Pt("error-foreground-hover").withDefault((e=>La.getValueFor(e).evaluate(e).hover));const Pa=Pt("error-foreground-active").withDefault((e=>La.getValueFor(e).evaluate(e).active));const Ra=Pt("error-foreground-focus").withDefault((e=>La.getValueFor(e).evaluate(e).focus));const Ia="data-jp-theme-name";const Aa="data-jp-theme-light";const Ma="--jp-layout-color1";let Ga=false;function _a(){if(!Ga){Ga=true;Ea()}}function Ea(){const e=()=>{const e=new MutationObserver((()=>{Ua()}));e.observe(document.body,{attributes:true,attributeFilter:[Ia],childList:false,characterData:false});Ua()};if(document.readyState==="complete"){e()}else{window.addEventListener("load",e)}}const qa=e=>{const t=parseInt(e,10);return isNaN(t)?null:t};const Wa={"--jp-border-width":{converter:qa,token:Xt},"--jp-border-radius":{converter:qa,token:_t},[Ma]:{converter:(e,t)=>{const o=B(e);if(o){const e=q(o);const t=O.fromObject({h:e.h,s:e.s,l:.5});const r=W(t);return se.create(r.r,r.g,r.b)}else{return null}},token:qo},"--jp-brand-color1":{converter:(e,t)=>{const o=B(e);if(o){const e=q(o);const r=t?1:-1;const a=O.fromObject({h:e.h,s:e.s,l:e.l+r*fo.getValueFor(document.body)/94});const i=W(a);return se.create(i.r,i.g,i.b)}else{return null}},token:Uo},"--jp-error-color1":{converter:(e,t)=>{const o=B(e);if(o){const e=q(o);const r=t?1:-1;const a=O.fromObject({h:e.h,s:e.s,l:e.l+r*fo.getValueFor(document.body)/94});const i=W(a);return se.create(i.r,i.g,i.b)}else{return null}},token:ba},"--jp-ui-font-family":{token:It},"--jp-ui-font-size1":{token:Yt}};function Ua(){var e;const t=getComputedStyle(document.body);const o=document.body.getAttribute(Aa);let r=false;if(o){r=o==="false"}else{const e=t.getPropertyValue(Ma).toString();if(e){const t=B(e);if(t){r=ge(se.create(t.r,t.g,t.b));console.debug(`Theme is ${r?"dark":"light"} based on '${Ma}' value: ${e}.`)}}}Gt.setValueFor(document.body,r?he.DarkMode:he.LightMode);for(const a in Wa){const o=Wa[a];const i=t.getPropertyValue(a).toString();if(document.body&&i!==""){const t=((e=o.converter)!==null&&e!==void 0?e:e=>e)(i.trim(),r);if(t!==null){o.token.setValueFor(document.body,t)}else{console.error(`Fail to parse value '${i}' for '${a}' as FAST design token.`)}}}}var Xa=o(29690);const Za=(e,t)=>(0,Xa.css)`
  ${(0,be.display)("flex")} :host {
    box-sizing: border-box;
    flex-direction: column;
    font-family: ${It};
    font-size: ${Kt};
    line-height: ${Qt};
    color: ${na};
    border-top: calc(${Xt} * 1px) solid ${pa};
  }
`;var Ya;(function(e){e["Canvas"]="Canvas";e["CanvasText"]="CanvasText";e["LinkText"]="LinkText";e["VisitedText"]="VisitedText";e["ActiveText"]="ActiveText";e["ButtonFace"]="ButtonFace";e["ButtonText"]="ButtonText";e["Field"]="Field";e["FieldText"]="FieldText";e["Highlight"]="Highlight";e["HighlightText"]="HighlightText";e["GrayText"]="GrayText"})(Ya||(Ya={}));const Ja=(0,Xa.cssPartial)`(${At} + ${Et}) * ${qt}`;const Ka=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("flex")} :host {
      box-sizing: border-box;
      font-family: ${It};
      flex-direction: column;
      font-size: ${Kt};
      line-height: ${Qt};
      border-bottom: calc(${Xt} * 1px) solid
        ${pa};
    }

    .region {
      display: none;
      padding: calc((6 + (${qt} * 2 * ${Et})) * 1px);
    }

    div.heading {
      display: grid;
      position: relative;
      grid-template-columns: calc(${Ja} * 1px) auto 1fr auto;
      color: ${na};
    }

    .button {
      appearance: none;
      border: none;
      background: none;
      grid-column: 3;
      outline: none;
      padding: 0 calc((6 + (${qt} * 2 * ${Et})) * 1px);
      text-align: left;
      height: calc(${Ja} * 1px);
      color: currentcolor;
      cursor: pointer;
      font-family: inherit;
    }

    .button:hover {
      color: currentcolor;
    }

    .button:active {
      color: currentcolor;
    }

    .button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      cursor: pointer;
    }

    /* prettier-ignore */
    .button:${be.focusVisible}::before {
      outline: none;
      border: calc(${Zt} * 1px) solid ${pr};
      border-radius: calc(${_t} * 1px);
    }

    :host([expanded]) .region {
      display: block;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-column: 1;
      grid-row: 1;
      pointer-events: none;
      position: relative;
    }

    slot[name='expanded-icon'],
    slot[name='collapsed-icon'] {
      fill: currentcolor;
    }

    slot[name='collapsed-icon'] {
      display: flex;
    }

    :host([expanded]) slot[name='collapsed-icon'] {
      display: none;
    }

    slot[name='expanded-icon'] {
      display: none;
    }

    :host([expanded]) slot[name='expanded-icon'] {
      display: flex;
    }

    .start {
      display: flex;
      align-items: center;
      padding-inline-start: calc(${qt} * 1px);
      justify-content: center;
      grid-column: 2;
      position: relative;
    }

    .end {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-column: 4;
      position: relative;
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      /* prettier-ignore */
      .button:${be.focusVisible}::before {
          border-color: ${Ya.Highlight};
        }
      :host slot[name='collapsed-icon'],
      :host([expanded]) slot[name='expanded-icon'] {
        fill: ${Ya.ButtonText};
      }
    `));const Qa=be.AccordionItem.compose({baseName:"accordion-item",template:be.accordionItemTemplate,styles:Ka,collapsedIcon:`\n        <svg\n            width="20"\n            height="20"\n            viewBox="0 0 16 16"\n            xmlns="http://www.w3.org/2000/svg"\n        >\n            <path\n                fill-rule="evenodd"\n                clip-rule="evenodd"\n                d="M5.00001 12.3263C5.00124 12.5147 5.05566 12.699 5.15699 12.8578C5.25831 13.0167 5.40243 13.1437 5.57273 13.2242C5.74304 13.3047 5.9326 13.3354 6.11959 13.3128C6.30659 13.2902 6.4834 13.2152 6.62967 13.0965L10.8988 8.83532C11.0739 8.69473 11.2153 8.51658 11.3124 8.31402C11.4096 8.11146 11.46 7.88966 11.46 7.66499C11.46 7.44033 11.4096 7.21853 11.3124 7.01597C11.2153 6.81341 11.0739 6.63526 10.8988 6.49467L6.62967 2.22347C6.48274 2.10422 6.30501 2.02912 6.11712 2.00691C5.92923 1.9847 5.73889 2.01628 5.56823 2.09799C5.39757 2.17969 5.25358 2.30817 5.153 2.46849C5.05241 2.62882 4.99936 2.8144 5.00001 3.00369V12.3263Z"\n            />\n        </svg>\n    `,expandedIcon:`\n        <svg\n            width="20"\n            height="20"\n            viewBox="0 0 16 16"\n            xmlns="http://www.w3.org/2000/svg"\n        >\n            <path\n                fill-rule="evenodd"\n                clip-rule="evenodd"\n                transform="rotate(90,8,8)"\n          d="M5.00001 12.3263C5.00124 12.5147 5.05566 12.699 5.15699 12.8578C5.25831 13.0167 5.40243 13.1437 5.57273 13.2242C5.74304 13.3047 5.9326 13.3354 6.11959 13.3128C6.30659 13.2902 6.4834 13.2152 6.62967 13.0965L10.8988 8.83532C11.0739 8.69473 11.2153 8.51658 11.3124 8.31402C11.4096 8.11146 11.46 7.88966 11.46 7.66499C11.46 7.44033 11.4096 7.21853 11.3124 7.01597C11.2153 6.81341 11.0739 6.63526 10.8988 6.49467L6.62967 2.22347C6.48274 2.10422 6.30501 2.02912 6.11712 2.00691C5.92923 1.9847 5.73889 2.01628 5.56823 2.09799C5.39757 2.17969 5.25358 2.30817 5.153 2.46849C5.05241 2.62882 4.99936 2.8144 5.00001 3.00369V12.3263Z"\n            />\n        </svg>\n    `});const ei=be.Accordion.compose({baseName:"accordion",template:be.accordionTemplate,styles:Za});var ti=o(8674);const oi=(0,Xa.css)`
  ${(0,be.display)("inline-flex")} :host {
    font-family: ${It};
    outline: none;
    font-size: ${Yt};
    line-height: ${Jt};
    height: calc(${Ja} * 1px);
    min-width: calc(${Ja} * 1px);
    background-color: ${Br};
    color: ${na};
    border-radius: calc(${_t} * 1px);
    fill: currentcolor;
    cursor: pointer;
    margin: calc((${Zt} + 2) * 1px);
  }

  .control {
    background: transparent;
    height: inherit;
    flex-grow: 1;
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 calc((10 + (${qt} * 2 * ${Et})) * 1px);
    white-space: nowrap;
    outline: none;
    text-decoration: none;
    border: calc(${Xt} * 1px) solid transparent;
    color: inherit;
    border-radius: inherit;
    fill: inherit;
    cursor: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  :host(:hover) {
    background-color: ${Or};
  }

  :host(:active) {
    background-color: ${Lr};
  }

  :host([aria-pressed='true']) {
    box-shadow: inset 0px 0px 2px 2px ${Zr};
  }

  :host([minimal]) {
    --density: -4;
  }

  :host([minimal]) .control {
    padding: 1px;
  }

  /* prettier-ignore */
  .control:${be.focusVisible} {
      outline: calc(${Zt} * 1px) solid ${Yr};
      outline-offset: 2px;
      -moz-outline-radius: 0px;
    }

  .control::-moz-focus-inner {
    border: 0;
  }

  .start,
  .end {
    display: flex;
  }

  .control.icon-only {
    padding: 0;
    line-height: 0;
  }

  ::slotted(svg) {
    ${""} width: 16px;
    height: 16px;
    pointer-events: none;
  }

  .start {
    margin-inline-end: 11px;
  }

  .end {
    margin-inline-start: 11px;
  }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
    :host .control {
      background-color: ${Ya.ButtonFace};
      border-color: ${Ya.ButtonText};
      color: ${Ya.ButtonText};
      fill: currentColor;
    }

    :host(:hover) .control {
      forced-color-adjust: none;
      background-color: ${Ya.Highlight};
      color: ${Ya.HighlightText};
    }

    /* prettier-ignore */
    .control:${be.focusVisible} {
          forced-color-adjust: none;
          background-color: ${Ya.Highlight};
          outline-color: ${Ya.ButtonText};
          color: ${Ya.HighlightText};
        }

    .control:hover,
    :host([appearance='outline']) .control:hover {
      border-color: ${Ya.ButtonText};
    }

    :host([href]) .control {
      border-color: ${Ya.LinkText};
      color: ${Ya.LinkText};
    }

    :host([href]) .control:hover,
        :host([href]) .control:${be.focusVisible} {
      forced-color-adjust: none;
      background: ${Ya.ButtonFace};
      outline-color: ${Ya.LinkText};
      color: ${Ya.LinkText};
      fill: currentColor;
    }
  `));const ri=(0,Xa.css)`
  :host([appearance='accent']) {
    background: ${dr};
    color: ${fr};
  }

  :host([appearance='accent']:hover) {
    background: ${ur};
    color: ${mr};
  }

  :host([appearance='accent'][aria-pressed='true']) {
    box-shadow: inset 0px 0px 2px 2px ${Vr};
  }

  :host([appearance='accent']:active) .control:active {
    background: ${hr};
    color: ${vr};
  }

  :host([appearance="accent"]) .control:${be.focusVisible} {
    outline-color: ${pr};
  }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
    :host([appearance='accent']) .control {
      forced-color-adjust: none;
      background: ${Ya.Highlight};
      color: ${Ya.HighlightText};
    }

    :host([appearance='accent']) .control:hover,
    :host([appearance='accent']:active) .control:active {
      background: ${Ya.HighlightText};
      border-color: ${Ya.Highlight};
      color: ${Ya.Highlight};
    }

    :host([appearance="accent"]) .control:${be.focusVisible} {
      outline-color: ${Ya.Highlight};
    }

    :host([appearance='accent'][href]) .control {
      background: ${Ya.LinkText};
      color: ${Ya.HighlightText};
    }

    :host([appearance='accent'][href]) .control:hover {
      background: ${Ya.ButtonFace};
      border-color: ${Ya.LinkText};
      box-shadow: none;
      color: ${Ya.LinkText};
      fill: currentColor;
    }

    :host([appearance="accent"][href]) .control:${be.focusVisible} {
      outline-color: ${Ya.HighlightText};
    }
  `));const ai=(0,Xa.css)`
  :host([appearance='error']) {
    background: ${va};
    color: ${fr};
  }

  :host([appearance='error']:hover) {
    background: ${$a};
    color: ${mr};
  }

  :host([appearance='error'][aria-pressed='true']) {
    box-shadow: inset 0px 0px 2px 2px ${Pa};
  }

  :host([appearance='error']:active) .control:active {
    background: ${xa};
    color: ${vr};
  }

  :host([appearance="error"]) .control:${be.focusVisible} {
    outline-color: ${ya};
  }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
    :host([appearance='error']) .control {
      forced-color-adjust: none;
      background: ${Ya.Highlight};
      color: ${Ya.HighlightText};
    }

    :host([appearance='error']) .control:hover,
    :host([appearance='error']:active) .control:active {
      background: ${Ya.HighlightText};
      border-color: ${Ya.Highlight};
      color: ${Ya.Highlight};
    }

    :host([appearance="error"]) .control:${be.focusVisible} {
      outline-color: ${Ya.Highlight};
    }

    :host([appearance='error'][href]) .control {
      background: ${Ya.LinkText};
      color: ${Ya.HighlightText};
    }

    :host([appearance='error'][href]) .control:hover {
      background: ${Ya.ButtonFace};
      border-color: ${Ya.LinkText};
      box-shadow: none;
      color: ${Ya.LinkText};
      fill: currentColor;
    }

    :host([appearance="error"][href]) .control:${be.focusVisible} {
      outline-color: ${Ya.HighlightText};
    }
  `));const ii=(0,Xa.css)`
  :host([appearance='hypertext']) {
    font-size: inherit;
    line-height: inherit;
    height: auto;
    min-width: 0;
    background: transparent;
  }

  :host([appearance='hypertext']) .control {
    display: inline;
    padding: 0;
    border: none;
    box-shadow: none;
    border-radius: 0;
    line-height: 1;
  }

  :host a.control:not(:link) {
    background-color: transparent;
    cursor: default;
  }
  :host([appearance='hypertext']) .control:link,
  :host([appearance='hypertext']) .control:visited {
    background: transparent;
    color: ${Tr};
    border-bottom: calc(${Xt} * 1px) solid ${Tr};
  }

  :host([appearance='hypertext']:hover),
  :host([appearance='hypertext']) .control:hover {
    background: transparent;
    border-bottom-color: ${Dr};
  }

  :host([appearance='hypertext']:active),
  :host([appearance='hypertext']) .control:active {
    background: transparent;
    border-bottom-color: ${Vr};
  }

  :host([appearance="hypertext"]) .control:${be.focusVisible} {
    outline-color: transparent;
    border-bottom: calc(${Zt} * 1px) solid ${ea};
    margin-bottom: calc(calc(${Xt} - ${Zt}) * 1px);
  }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
    :host([appearance='hypertext']:hover) {
      background-color: ${Ya.ButtonFace};
      color: ${Ya.ButtonText};
    }
    :host([appearance="hypertext"][href]) .control:hover,
        :host([appearance="hypertext"][href]) .control:active,
        :host([appearance="hypertext"][href]) .control:${be.focusVisible} {
      color: ${Ya.LinkText};
      border-bottom-color: ${Ya.LinkText};
      box-shadow: none;
    }
  `));const ni=(0,Xa.css)`
  :host([appearance='lightweight']) {
    background: transparent;
    color: ${Tr};
  }

  :host([appearance='lightweight']) .control {
    padding: 0;
    height: initial;
    border: none;
    box-shadow: none;
    border-radius: 0;
  }

  :host([appearance='lightweight']:hover) {
    background: transparent;
    color: ${Dr};
  }

  :host([appearance='lightweight']:active) {
    background: transparent;
    color: ${Vr};
  }

  :host([appearance='lightweight']) .content {
    position: relative;
  }

  :host([appearance='lightweight']) .content::before {
    content: '';
    display: block;
    height: calc(${Xt} * 1px);
    position: absolute;
    top: calc(1em + 4px);
    width: 100%;
  }

  :host([appearance='lightweight']:hover) .content::before {
    background: ${Dr};
  }

  :host([appearance='lightweight']:active) .content::before {
    background: ${Vr};
  }

  :host([appearance="lightweight"]) .control:${be.focusVisible} {
    outline-color: transparent;
  }

  :host([appearance="lightweight"]) .control:${be.focusVisible} .content::before {
    background: ${na};
    height: calc(${Zt} * 1px);
  }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
    :host([appearance="lightweight"]) .control:hover,
        :host([appearance="lightweight"]) .control:${be.focusVisible} {
      forced-color-adjust: none;
      background: ${Ya.ButtonFace};
      color: ${Ya.Highlight};
    }
    :host([appearance="lightweight"]) .control:hover .content::before,
        :host([appearance="lightweight"]) .control:${be.focusVisible} .content::before {
      background: ${Ya.Highlight};
    }

    :host([appearance="lightweight"][href]) .control:hover,
        :host([appearance="lightweight"][href]) .control:${be.focusVisible} {
      background: ${Ya.ButtonFace};
      box-shadow: none;
      color: ${Ya.LinkText};
    }

    :host([appearance="lightweight"][href]) .control:hover .content::before,
        :host([appearance="lightweight"][href]) .control:${be.focusVisible} .content::before {
      background: ${Ya.LinkText};
    }
  `));const li=(0,Xa.css)`
  :host([appearance='outline']) {
    background: transparent;
    border-color: ${dr};
  }

  :host([appearance='outline']:hover) {
    border-color: ${ur};
  }

  :host([appearance='outline']:active) {
    border-color: ${hr};
  }

  :host([appearance='outline']) .control {
    border-color: inherit;
  }

  :host([appearance="outline"]) .control:${be.focusVisible} {
    outline-color: ${pr};
  }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
    :host([appearance='outline']) .control {
      border-color: ${Ya.ButtonText};
    }
    :host([appearance="outline"]) .control:${be.focusVisible} {
      forced-color-adjust: none;
      background-color: ${Ya.Highlight};
      outline-color: ${Ya.ButtonText};
      color: ${Ya.HighlightText};
      fill: currentColor;
    }
    :host([appearance='outline'][href]) .control {
      background: ${Ya.ButtonFace};
      border-color: ${Ya.LinkText};
      color: ${Ya.LinkText};
      fill: currentColor;
    }
    :host([appearance="outline"][href]) .control:hover,
        :host([appearance="outline"][href]) .control:${be.focusVisible} {
      forced-color-adjust: none;
      outline-color: ${Ya.LinkText};
    }
  `));const si=(0,Xa.css)`
  :host([appearance='stealth']) {
    background: transparent;
  }

  :host([appearance='stealth']:hover) {
    background: ${_r};
  }

  :host([appearance='stealth']:active) {
    background: ${Er};
  }

  :host([appearance='stealth']) .control:${be.focusVisible} {
    outline-color: ${pr};
  }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
    :host([appearance='stealth']),
    :host([appearance='stealth']) .control {
      forced-color-adjust: none;
      background: ${Ya.ButtonFace};
      border-color: transparent;
      color: ${Ya.ButtonText};
      fill: currentColor;
    }

    :host([appearance='stealth']:hover) .control {
      background: ${Ya.Highlight};
      border-color: ${Ya.Highlight};
      color: ${Ya.HighlightText};
      fill: currentColor;
    }

    :host([appearance="stealth"]:${be.focusVisible}) .control {
      outline-color: ${Ya.Highlight};
      color: ${Ya.HighlightText};
      fill: currentColor;
    }

    :host([appearance='stealth'][href]) .control {
      color: ${Ya.LinkText};
    }

    :host([appearance="stealth"][href]:hover) .control,
        :host([appearance="stealth"][href]:${be.focusVisible}) .control {
      background: ${Ya.LinkText};
      border-color: ${Ya.LinkText};
      color: ${Ya.HighlightText};
      fill: currentColor;
    }

    :host([appearance="stealth"][href]:${be.focusVisible}) .control {
      forced-color-adjust: none;
      box-shadow: 0 0 0 1px ${Ya.LinkText};
    }
  `));function ci(e,t){return new be.PropertyStyleSheetBehavior("appearance",e,t)}const di=(e,t)=>(0,Xa.css)`
    ${oi}
  `.withBehaviors(ci("accent",ri),ci("hypertext",ii),ci("lightweight",ni),ci("outline",li),ci("stealth",si));class ui extends be.Anchor{appearanceChanged(e,t){if(this.$fastController.isConnected){this.classList.remove(e);this.classList.add(t)}}connectedCallback(){super.connectedCallback();if(!this.appearance){this.appearance="neutral"}}defaultSlottedContentChanged(e,t){const o=this.defaultSlottedContent.filter((e=>e.nodeType===Node.ELEMENT_NODE));if(o.length===1&&o[0]instanceof SVGElement){this.control.classList.add("icon-only")}else{this.control.classList.remove("icon-only")}}}(0,ti.Cg)([Xa.attr],ui.prototype,"appearance",void 0);const hi=ui.compose({baseName:"anchor",baseClass:be.Anchor,template:be.anchorTemplate,styles:di,shadowOptions:{delegatesFocus:true}});const pi=(e,t)=>(0,Xa.css)`
  :host {
    contain: layout;
    display: block;
  }
`;const gi=be.AnchoredRegion.compose({baseName:"anchored-region",template:be.anchoredRegionTemplate,styles:pi});class bi{constructor(e,t){this.cache=new WeakMap;this.ltr=e;this.rtl=t}bind(e){this.attach(e)}unbind(e){const t=this.cache.get(e);if(t){Wt.unsubscribe(t)}}attach(e){const t=this.cache.get(e)||new fi(this.ltr,this.rtl,e);const o=Wt.getValueFor(e);Wt.subscribe(t);t.attach(o);this.cache.set(e,t)}}class fi{constructor(e,t,o){this.ltr=e;this.rtl=t;this.source=o;this.attached=null}handleChange({target:e,token:t}){this.attach(t.getValueFor(e))}attach(e){if(this.attached!==this[e]){if(this.attached!==null){this.source.$fastController.removeStyles(this.attached)}this.attached=this[e];if(this.attached!==null){this.source.$fastController.addStyles(this.attached)}}}}const mi=(e,t)=>(0,Xa.css)`
  ::slotted(${e.tagFor(be.Badge)}) {
    left: 0;
  }
`;const vi=(e,t)=>(0,Xa.css)`
  ::slotted(${e.tagFor(be.Badge)}) {
    right: 0;
  }
`;const $i=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("flex")} :host {
      position: relative;
      height: var(--avatar-size, var(--avatar-size-default));
      width: var(--avatar-size, var(--avatar-size-default));
      --avatar-size-default: calc(
        (
            (${At} + ${Et}) * ${qt} +
              ((${qt} * 8) - 40)
          ) * 1px
      );
      --avatar-text-size: ${Yt};
      --avatar-text-ratio: ${qt};
    }

    .link {
      text-decoration: none;
      color: ${na};
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      min-width: 100%;
    }

    .square {
      border-radius: calc(${_t} * 1px);
      min-width: 100%;
      overflow: hidden;
    }

    .circle {
      border-radius: 100%;
      min-width: 100%;
      overflow: hidden;
    }

    .backplate {
      position: relative;
      display: flex;
      background-color: ${dr};
    }

    .media,
    ::slotted(img) {
      max-width: 100%;
      position: absolute;
      display: block;
    }

    .content {
      font-size: calc(
        (
            var(--avatar-text-size) +
              var(--avatar-size, var(--avatar-size-default))
          ) / var(--avatar-text-ratio)
      );
      line-height: var(--avatar-size, var(--avatar-size-default));
      display: block;
      min-height: var(--avatar-size, var(--avatar-size-default));
    }

    ::slotted(${e.tagFor(be.Badge)}) {
      position: absolute;
      display: block;
    }
  `.withBehaviors(new bi(vi(e,t),mi(e,t)));class xi extends be.Avatar{}(0,ti.Cg)([(0,Xa.attr)({attribute:"src"})],xi.prototype,"imgSrc",void 0);(0,ti.Cg)([Xa.attr],xi.prototype,"alt",void 0);const yi=(0,Xa.html)`
  ${(0,Xa.when)((e=>e.imgSrc),(0,Xa.html)`
      <img
        src="${e=>e.imgSrc}"
        alt="${e=>e.alt}"
        slot="media"
        class="media"
        part="media"
      />
    `)}
`;const wi=xi.compose({baseName:"avatar",baseClass:be.Avatar,template:be.avatarTemplate,styles:$i,media:yi,shadowOptions:{delegatesFocus:true}});const ki=(e,t)=>(0,Xa.css)`
  ${(0,be.display)("inline-block")} :host {
    box-sizing: border-box;
    font-family: ${It};
    font-size: ${Kt};
    line-height: ${Qt};
  }

  .control {
    border-radius: calc(${_t} * 1px);
    padding: calc(((${qt} * 0.5) - ${Xt}) * 1px)
      calc((${qt} - ${Xt}) * 1px);
    color: ${na};
    font-weight: 600;
    border: calc(${Xt} * 1px) solid transparent;
    background-color: ${Br};
  }

  .control[style] {
    font-weight: 400;
  }

  :host([circular]) .control {
    border-radius: 100px;
    padding: 0 calc(${qt} * 1px);
    height: calc((${Ja} - (${qt} * 3)) * 1px);
    min-width: calc((${Ja} - (${qt} * 3)) * 1px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
`;const Ci=be.Badge.compose({baseName:"badge",template:be.badgeTemplate,styles:ki});const Fi=(e,t)=>(0,Xa.css)`
  ${(0,be.display)("inline-block")} :host {
    box-sizing: border-box;
    font-family: ${It};
    font-size: ${Yt};
    line-height: ${Jt};
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
`;const Si=be.Breadcrumb.compose({baseName:"breadcrumb",template:be.breadcrumbTemplate,styles:Fi});const Ti=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("inline-flex")} :host {
        background: transparent;
        box-sizing: border-box;
        font-family: ${It};
        font-size: ${Yt};
        fill: currentColor;
        line-height: ${Jt};
        min-width: calc(${Ja} * 1px);
        outline: none;
        color: ${na}
    }

    .listitem {
        display: flex;
        align-items: center;
        width: max-content;
    }

    .separator {
        margin: 0 6px;
        display: flex;
    }

    .control {
        align-items: center;
        box-sizing: border-box;
        color: ${Tr};
        cursor: pointer;
        display: flex;
        fill: inherit;
        outline: none;
        text-decoration: none;
        white-space: nowrap;
    }

    .control:hover {
        color: ${Dr};
    }

    .control:active {
        color: ${Vr};
    }

    .control .content {
        position: relative;
    }

    .control .content::before {
        content: "";
        display: block;
        height: calc(${Xt} * 1px);
        left: 0;
        position: absolute;
        right: 0;
        top: calc(1em + 4px);
        width: 100%;
    }

    .control:hover .content::before {
        background: ${Dr};
    }

    .control:active .content::before {
        background: ${Vr};
    }

    .control:${be.focusVisible} .content::before {
        background: ${jr};
        height: calc(${Zt} * 1px);
    }

    .control:not([href]) {
        color: ${na};
        cursor: default;
    }

    .control:not([href]) .content::before {
        background: none;
    }

    .start,
    .end {
        display: flex;
    }

    ::slotted(svg) {
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-end: 6px;
    }

    .end {
        margin-inline-start: 6px;
    }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      .control:hover .content::before,
                .control:${be.focusVisible} .content::before {
        background: ${Ya.LinkText};
      }
      .start,
      .end {
        fill: ${Ya.ButtonText};
      }
    `));const Di=be.BreadcrumbItem.compose({baseName:"breadcrumb-item",template:be.breadcrumbItemTemplate,styles:Ti,separator:"/",shadowOptions:{delegatesFocus:true}});const Vi=(e,t)=>(0,Xa.css)`
    :host([disabled]),
    :host([disabled]:hover),
    :host([disabled]:active) {
      opacity: ${Ut};
      background-color: ${Br};
      cursor: ${be.disabledCursor};
    }

    ${oi}
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host([disabled]),
      :host([disabled]) .control,
      :host([disabled]:hover),
      :host([disabled]:active) {
        forced-color-adjust: none;
        background-color: ${Ya.ButtonFace};
        outline-color: ${Ya.GrayText};
        color: ${Ya.GrayText};
        cursor: ${be.disabledCursor};
        opacity: 1;
      }
    `),ci("accent",(0,Xa.css)`
        :host([appearance='accent'][disabled]),
        :host([appearance='accent'][disabled]:hover),
        :host([appearance='accent'][disabled]:active) {
          background: ${dr};
        }

        ${ri}
      `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
          :host([appearance='accent'][disabled]) .control,
          :host([appearance='accent'][disabled]) .control:hover {
            background: ${Ya.ButtonFace};
            border-color: ${Ya.GrayText};
            color: ${Ya.GrayText};
          }
        `))),ci("error",(0,Xa.css)`
        :host([appearance='error'][disabled]),
        :host([appearance='error'][disabled]:hover),
        :host([appearance='error'][disabled]:active) {
          background: ${va};
        }

        ${ai}
      `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
          :host([appearance='error'][disabled]) .control,
          :host([appearance='error'][disabled]) .control:hover {
            background: ${Ya.ButtonFace};
            border-color: ${Ya.GrayText};
            color: ${Ya.GrayText};
          }
        `))),ci("lightweight",(0,Xa.css)`
        :host([appearance='lightweight'][disabled]:hover),
        :host([appearance='lightweight'][disabled]:active) {
          background-color: transparent;
          color: ${Tr};
        }

        :host([appearance='lightweight'][disabled]) .content::before,
        :host([appearance='lightweight'][disabled]:hover) .content::before,
        :host([appearance='lightweight'][disabled]:active) .content::before {
          background: transparent;
        }

        ${ni}
      `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
          :host([appearance='lightweight'].disabled) .control {
            forced-color-adjust: none;
            color: ${Ya.GrayText};
          }

          :host([appearance='lightweight'].disabled)
            .control:hover
            .content::before {
            background: none;
          }
        `))),ci("outline",(0,Xa.css)`
        :host([appearance='outline'][disabled]),
        :host([appearance='outline'][disabled]:hover),
        :host([appearance='outline'][disabled]:active) {
          background: transparent;
          border-color: ${dr};
        }

        ${li}
      `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
          :host([appearance='outline'][disabled]) .control {
            border-color: ${Ya.GrayText};
          }
        `))),ci("stealth",(0,Xa.css)`
        ${si}
      `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
          :host([appearance='stealth'][disabled]) {
            background: ${Ya.ButtonFace};
          }

          :host([appearance='stealth'][disabled]) .control {
            background: ${Ya.ButtonFace};
            border-color: transparent;
            color: ${Ya.GrayText};
          }
        `))));class ji extends be.Button{constructor(){super(...arguments);this.appearance="neutral"}defaultSlottedContentChanged(e,t){const o=this.defaultSlottedContent.filter((e=>e.nodeType===Node.ELEMENT_NODE));if(o.length===1&&(o[0]instanceof SVGElement||o[0].classList.contains("fa")||o[0].classList.contains("fas"))){this.control.classList.add("icon-only")}else{this.control.classList.remove("icon-only")}}}(0,ti.Cg)([Xa.attr],ji.prototype,"appearance",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"minimal",mode:"boolean"})],ji.prototype,"minimal",void 0);const zi=ji.compose({baseName:"button",baseClass:be.Button,template:be.buttonTemplate,styles:Vi,shadowOptions:{delegatesFocus:true}});const Bi="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))";const Oi="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))";const Li=`box-shadow: ${Bi}, ${Oi};`;const Hi=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("block")} :host {
      --elevation: 4;
      display: block;
      contain: content;
      height: var(--card-height, 100%);
      width: var(--card-width, 100%);
      box-sizing: border-box;
      background: ${lr};
      border-radius: calc(${_t} * 1px);
      ${Li}
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        forced-color-adjust: none;
        background: ${Ya.Canvas};
        box-shadow: 0 0 0 1px ${Ya.CanvasText};
      }
    `));class Ni extends be.Card{connectedCallback(){super.connectedCallback();const e=(0,be.composedParent)(this);if(e){lr.setValueFor(this,(t=>Jr.getValueFor(t).evaluate(t,lr.getValueFor(e))))}}}const Pi=Ni.compose({baseName:"card",baseClass:be.Card,template:be.cardTemplate,styles:Hi});const Ri=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("inline-flex")} :host {
      align-items: center;
      outline: none;
      margin: calc(${qt} * 1px) 0;
      /* Chromium likes to select label text or the default slot when the checkbox is
            clicked. Maybe there is a better solution here? */
      user-select: none;
    }

    .control {
      position: relative;
      width: calc((${Ja} / 2 + ${qt}) * 1px);
      height: calc((${Ja} / 2 + ${qt}) * 1px);
      box-sizing: border-box;
      border-radius: calc(${_t} * 1px);
      border: calc(${Xt} * 1px) solid ${sa};
      background: ${Pr};
      outline: none;
      cursor: pointer;
    }

    :host([aria-invalid='true']) .control {
      border-color: ${va};
    }

    .label {
      font-family: ${It};
      color: ${na};
      /* Need to discuss with Brian how HorizontalSpacingNumber can work.
            https://github.com/microsoft/fast/issues/2766 */
      padding-inline-start: calc(${qt} * 2px + 2px);
      margin-inline-end: calc(${qt} * 2px + 2px);
      cursor: pointer;
      font-size: ${Yt};
      line-height: ${Jt};
    }

    .label__hidden {
      display: none;
      visibility: hidden;
    }

    .checked-indicator {
      width: 100%;
      height: 100%;
      display: block;
      fill: ${fr};
      opacity: 0;
      pointer-events: none;
    }

    .indeterminate-indicator {
      border-radius: calc(${_t} * 1px);
      background: ${fr};
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }

    :host(:not([disabled])) .control:hover {
      background: ${Rr};
      border-color: ${ca};
    }

    :host(:not([disabled])) .control:active {
      background: ${Ir};
      border-color: ${da};
    }

    :host([aria-invalid='true']:not([disabled])) .control:hover {
      border-color: ${$a};
    }

    :host([aria-invalid='true']:not([disabled])) .control:active {
      border-color: ${xa};
    }

    :host(:${be.focusVisible}) .control {
      outline: calc(${Zt} * 1px) solid ${pr};
      outline-offset: 2px;
    }

    :host([aria-invalid='true']:${be.focusVisible}) .control {
      outline-color: ${ya};
    }

    :host([aria-checked='true']) .control {
      background: ${dr};
      border: calc(${Xt} * 1px) solid ${dr};
    }

    :host([aria-checked='true']:not([disabled])) .control:hover {
      background: ${ur};
      border: calc(${Xt} * 1px) solid ${ur};
    }

    :host([aria-invalid='true'][aria-checked='true']) .control {
      background-color: ${va};
      border-color: ${va};
    }

    :host([aria-invalid='true'][aria-checked='true']:not([disabled]))
      .control:hover {
      background-color: ${$a};
      border-color: ${$a};
    }

    :host([aria-checked='true']:not([disabled]))
      .control:hover
      .checked-indicator {
      fill: ${mr};
    }

    :host([aria-checked='true']:not([disabled]))
      .control:hover
      .indeterminate-indicator {
      background: ${mr};
    }

    :host([aria-checked='true']:not([disabled])) .control:active {
      background: ${hr};
      border: calc(${Xt} * 1px) solid ${hr};
    }

    :host([aria-invalid='true'][aria-checked='true']:not([disabled]))
      .control:active {
      background-color: ${xa};
      border-color: ${xa};
    }

    :host([aria-checked='true']:not([disabled]))
      .control:active
      .checked-indicator {
      fill: ${vr};
    }

    :host([aria-checked='true']:not([disabled]))
      .control:active
      .indeterminate-indicator {
      background: ${vr};
    }

    :host([aria-checked="true"]:${be.focusVisible}:not([disabled])) .control {
      outline: calc(${Zt} * 1px) solid ${pr};
      outline-offset: 2px;
    }

    :host([aria-invalid='true'][aria-checked="true"]:${be.focusVisible}:not([disabled])) .control {
      outline-color: ${ya};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
      cursor: ${be.disabledCursor};
    }

    :host([aria-checked='true']:not(.indeterminate)) .checked-indicator,
    :host(.indeterminate) .indeterminate-indicator {
      opacity: 1;
    }

    :host([disabled]) {
      opacity: ${Ut};
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      .control {
        forced-color-adjust: none;
        border-color: ${Ya.FieldText};
        background: ${Ya.Field};
      }
      :host([aria-invalid='true']) .control {
        border-style: dashed;
      }
      .checked-indicator {
        fill: ${Ya.FieldText};
      }
      .indeterminate-indicator {
        background: ${Ya.FieldText};
      }
      :host(:not([disabled])) .control:hover,
      .control:active {
        border-color: ${Ya.Highlight};
        background: ${Ya.Field};
      }
      :host(:${be.focusVisible}) .control {
        outline: calc(${Zt} * 1px) solid ${Ya.FieldText};
        outline-offset: 2px;
      }
      :host([aria-checked="true"]:${be.focusVisible}:not([disabled])) .control {
        outline: calc(${Zt} * 1px) solid ${Ya.FieldText};
        outline-offset: 2px;
      }
      :host([aria-checked='true']) .control {
        background: ${Ya.Highlight};
        border-color: ${Ya.Highlight};
      }
      :host([aria-checked='true']:not([disabled])) .control:hover,
      .control:active {
        border-color: ${Ya.Highlight};
        background: ${Ya.HighlightText};
      }
      :host([aria-checked='true']) .checked-indicator {
        fill: ${Ya.HighlightText};
      }
      :host([aria-checked='true']:not([disabled]))
        .control:hover
        .checked-indicator {
        fill: ${Ya.Highlight};
      }
      :host([aria-checked='true']) .indeterminate-indicator {
        background: ${Ya.HighlightText};
      }
      :host([aria-checked='true']) .control:hover .indeterminate-indicator {
        background: ${Ya.Highlight};
      }
      :host([disabled]) {
        opacity: 1;
      }
      :host([disabled]) .control {
        forced-color-adjust: none;
        border-color: ${Ya.GrayText};
        background: ${Ya.Field};
      }
      :host([disabled]) .indeterminate-indicator,
      :host([aria-checked='true'][disabled])
        .control:hover
        .indeterminate-indicator {
        forced-color-adjust: none;
        background: ${Ya.GrayText};
      }
      :host([disabled]) .checked-indicator,
      :host([aria-checked='true'][disabled]) .control:hover .checked-indicator {
        forced-color-adjust: none;
        fill: ${Ya.GrayText};
      }
    `));const Ii=(e,t)=>(0,Xa.html)`
  <template
    role="checkbox"
    aria-checked="${e=>e.checked}"
    aria-required="${e=>e.required}"
    aria-disabled="${e=>e.disabled}"
    aria-readonly="${e=>e.readOnly}"
    tabindex="${e=>e.disabled?null:0}"
    @keypress="${(e,t)=>e.keypressHandler(t.event)}"
    @click="${(e,t)=>e.clickHandler(t.event)}"
  >
    <div part="control" class="control">
      <slot name="checked-indicator">
        ${t.checkedIndicator||""}
      </slot>
      <slot name="indeterminate-indicator">
        ${t.indeterminateIndicator||""}
      </slot>
    </div>
    <label
      part="label"
      class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
    >
      <slot ${(0,Xa.slotted)("defaultSlottedNodes")}></slot>
    </label>
  </template>
`;class Ai extends be.Checkbox{indeterminateChanged(e,t){if(this.indeterminate){this.classList.add("indeterminate")}else{this.classList.remove("indeterminate")}}}const Mi=Ai.compose({baseName:"checkbox",baseClass:be.Checkbox,template:Ii,styles:Ri,checkedIndicator:`\n        <svg\n            part="checked-indicator"\n            class="checked-indicator"\n            viewBox="0 0 20 20"\n            xmlns="http://www.w3.org/2000/svg"\n        >\n            <path\n                fill-rule="evenodd"\n                clip-rule="evenodd"\n                d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"\n            />\n        </svg>\n    `,indeterminateIndicator:`\n        <div part="indeterminate-indicator" class="indeterminate-indicator"></div>\n    `});const Gi=(e,t)=>{const o=e.tagFor(be.ListboxOption);const r=e.name===e.tagFor(be.ListboxElement)?"":".listbox";return(0,Xa.css)`
        ${!r?(0,be.display)("inline-flex"):""}

        :host ${r} {
            background: ${lr};
            border: calc(${Xt} * 1px) solid ${sa};
            border-radius: calc(${_t} * 1px);
            box-sizing: border-box;
            flex-direction: column;
            padding: calc(${qt} * 1px) 0;
        }

        ${!r?(0,Xa.css)`
:host(:${be.focusVisible}:not([disabled])) {
                outline: none;
            }

            :host(:focus-within:not([disabled])) {
                border-color: ${ea};
                box-shadow: 0 0 0
                    calc((${Zt} - ${Xt}) * 1px)
                    ${ea} inset;
            }

            :host([disabled]) ::slotted(*) {
                cursor: ${be.disabledCursor};
                opacity: ${Ut};
                pointer-events: none;
            }
        `:""}

        ${r||":host([size])"} {
            max-height: calc(
                (var(--size) * ${Ja} + (${qt} * ${Xt} * 2)) * 1px
            );
            overflow-y: auto;
        }

        :host([size="0"]) ${r} {
            max-height: none;
        }
    `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
                :host(:not([multiple]):${be.focusVisible}) ::slotted(${o}[aria-selected="true"]),
                :host([multiple]:${be.focusVisible}) ::slotted(${o}[aria-checked="true"]) {
                    border-color: ${Ya.ButtonText};
                    box-shadow: 0 0 0 calc(${Zt} * 1px) inset ${Ya.HighlightText};
                }

                :host(:not([multiple]):${be.focusVisible}) ::slotted(${o}[aria-selected="true"]) {
                    background: ${Ya.Highlight};
                    color: ${Ya.HighlightText};
                    fill: currentcolor;
                }

                ::slotted(${o}[aria-selected="true"]:not([aria-checked="true"])) {
                    background: ${Ya.Highlight};
                    border-color: ${Ya.HighlightText};
                    color: ${Ya.HighlightText};
                }
            `))};const _i=(e,t)=>{const o=e.name===e.tagFor(be.Select);return(0,Xa.css)`
  ${(0,be.display)("inline-flex")}
  
  :host {
    --elevation: 14;
    background: ${Pr};
    border-radius: calc(${_t} * 1px);
    border: calc(${Xt} * 1px) solid ${Ur};
    box-sizing: border-box;
    color: ${na};
    font-family: ${It};
    height: calc(${Ja} * 1px);
    position: relative;
    user-select: none;
    min-width: 250px;
    outline: none;
    vertical-align: top;
  }

  :host([aria-invalid='true']) {
    border-color: ${va};
  }
  
  :host(:not([autowidth])) {
    min-width: 250px;
  }
  
  ${o?(0,Xa.css)`
  :host(:not([aria-haspopup])) {
    --elevation: 0;
    border: 0;
    height: auto;
    min-width: 0;
  }
  `:""}
  
  ${Gi(e,t)}
  
  :host .listbox {
    ${Li}
    border: none;
    display: flex;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }
  
  .control + .listbox {
    --stroke-size: calc(${qt} * ${Xt} * 2);
    max-height: calc(
      (var(--listbox-max-height) * ${Ja} + var(--stroke-size)) * 1px
      );
  }
  
  ${o?(0,Xa.css)`
  :host(:not([aria-haspopup])) .listbox {
    left: auto;
    position: static;
    z-index: auto;
  }
  `:""}
  
  :host(:not([autowidth])) .listbox {
    width: 100%;
  }
  
  :host([autowidth]) ::slotted([role='option']),
  :host([autowidth]) ::slotted(option) {
    padding: 0 calc(1em + ${qt} * 1.25px + 1px);
  }
  
  .listbox[hidden] {
    display: none;
  }
  
  .control {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    font-size: ${Yt};
    font-family: inherit;
    line-height: ${Jt};
    min-height: 100%;
    padding: 0 calc(${qt} * 2.25px);
    width: 100%;
  }
  
  :host([minimal]) {
    --density: -4;
  }
  
  :host(:not([disabled]):hover) {
    background: ${Rr};
    border-color: ${Xr};
  }
  
  :host([aria-invalid='true']:not([disabled]):hover) {
    border-color: ${$a};
  }
  
  :host(:${be.focusVisible}) {
    border-color: ${pr};
    box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
    ${pr};
  }
  
  :host([aria-invalid='true']:${be.focusVisible}) {
    border-color: ${ya};
    box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
    ${ya};
  }
  
  :host(:not([size]):not([multiple]):not([open]):${be.focusVisible}),
  :host([multiple]:${be.focusVisible}),
  :host([size]:${be.focusVisible}) {
    box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
    ${pr};
  }
  
  :host([aria-invalid='true']:not([size]):not([multiple]):not([open]):${be.focusVisible}),
  :host([aria-invalid='true'][multiple]:${be.focusVisible}),
  :host([aria-invalid='true'][size]:${be.focusVisible}) {
    box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
    ${ya};
  }
  
  :host(:not([multiple]):not([size]):${be.focusVisible}) ::slotted(${e.tagFor(be.ListboxOption)}[aria-selected="true"]:not([disabled])) {
    box-shadow: 0 0 0 calc(${Zt} * 1px) inset ${pr};
    border-color: ${pr};
    background: ${pr};
    color: ${$r};
  }
    
  :host([disabled]) {
    cursor: ${be.disabledCursor};
    opacity: ${Ut};
  }
  
  :host([disabled]) .control {
    cursor: ${be.disabledCursor};
    user-select: none;
  }
  
  :host([disabled]:hover) {
    background: ${Gr};
    color: ${na};
    fill: currentcolor;
  }
  
  :host(:not([disabled])) .control:active {
    background: ${Ir};
    border-color: ${hr};
    border-radius: calc(${_t} * 1px);
  }
  
  :host([open][position="above"]) .listbox {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0;
    bottom: calc(${Ja} * 1px);
  }
  
  :host([open][position="below"]) .listbox {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 0;
    top: calc(${Ja} * 1px);
  }
  
  .selected-value {
    flex: 1 1 auto;
    font-family: inherit;
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .indicator {
    flex: 0 0 auto;
    margin-inline-start: 1em;
  }
  
  slot[name="listbox"] {
    display: none;
    width: 100%;
  }
  
  :host([open]) slot[name="listbox"] {
    display: flex;
    position: absolute;
    ${Li}
  }
  
  .end {
    margin-inline-start: auto;
  }
  
  .start,
  .end,
  .indicator,
  .select-indicator,
  ::slotted(svg) {
    /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
    fill: currentcolor;
    height: 1em;
    min-height: calc(${qt} * 4px);
    min-width: calc(${qt} * 4px);
    width: 1em;
  }
  
  ::slotted([role="option"]),
  ::slotted(option) {
    flex: 0 0 auto;
  }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host(:not([disabled]):hover),
      :host(:not([disabled]):active) {
        border-color: ${Ya.Highlight};
      }

      :host([aria-invalid='true']) {
        border-style: dashed;
      }
      
      :host(:not([disabled]):${be.focusVisible}) {
        background-color: ${Ya.ButtonFace};
        box-shadow: 0 0 0 calc(${Zt} * 1px) ${Ya.Highlight};
        color: ${Ya.ButtonText};
        fill: currentcolor;
        forced-color-adjust: none;
      }
      
      :host(:not([disabled]):${be.focusVisible}) .listbox {
        background: ${Ya.ButtonFace};
      }
      
      :host([disabled]) {
        border-color: ${Ya.GrayText};
        background-color: ${Ya.ButtonFace};
        color: ${Ya.GrayText};
        fill: currentcolor;
        opacity: 1;
        forced-color-adjust: none;
      }
      
      :host([disabled]:hover) {
        background: ${Ya.ButtonFace};
      }
      
      :host([disabled]) .control {
        color: ${Ya.GrayText};
        border-color: ${Ya.GrayText};
      }
      
      :host([disabled]) .control .select-indicator {
        fill: ${Ya.GrayText};
      }
      
      :host(:${be.focusVisible}) ::slotted([aria-selected="true"][role="option"]),
      :host(:${be.focusVisible}) ::slotted(option[aria-selected="true"]),
      :host(:${be.focusVisible}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
        background: ${Ya.Highlight};
        border-color: ${Ya.ButtonText};
        box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
        ${Ya.HighlightText};
        color: ${Ya.HighlightText};
        fill: currentcolor;
      }
      
      .start,
      .end,
      .indicator,
      .select-indicator,
      ::slotted(svg) {
        color: ${Ya.ButtonText};
        fill: currentcolor;
      }
      `))};const Ei=(e,t)=>(0,Xa.css)`
  ${_i(e,t)}

  :host(:empty) .listbox {
    display: none;
  }

  :host([disabled]) *,
  :host([disabled]) {
    cursor: ${be.disabledCursor};
    user-select: none;
  }

  :host(:focus-within:not([disabled])) {
    border-color: ${pr};
    box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
      ${pr};
  }

  :host([aria-invalid='true']:focus-within:not([disabled])) {
    border-color: ${ya};
    box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
      ${ya};
  }

  .selected-value {
    -webkit-appearance: none;
    background: transparent;
    border: none;
    color: inherit;
    font-size: ${Yt};
    line-height: ${Jt};
    height: calc(100% - (${Xt} * 1px));
    margin: auto 0;
    width: 100%;
  }

  .selected-value:hover,
    .selected-value:${be.focusVisible},
    .selected-value:disabled,
    .selected-value:active {
    outline: none;
  }
`;class qi extends be.Combobox{connectedCallback(){super.connectedCallback();this.setAutoWidth()}slottedOptionsChanged(e,t){super.slottedOptionsChanged(e,t);this.setAutoWidth()}autoWidthChanged(e,t){if(t){this.setAutoWidth()}else{this.style.removeProperty("width")}}setAutoWidth(){if(!this.autoWidth||!this.isConnected){return}let e=this.listbox.getBoundingClientRect().width;if(e===0&&this.listbox.hidden){Object.assign(this.listbox.style,{visibility:"hidden"});this.listbox.removeAttribute("hidden");e=this.listbox.getBoundingClientRect().width;this.listbox.setAttribute("hidden","");this.listbox.style.removeProperty("visibility")}if(e>0){Object.assign(this.style,{width:`${e}px`})}}maxHeightChanged(e,t){this.updateComputedStylesheet()}updateComputedStylesheet(){if(this.computedStylesheet){this.$fastController.removeStyles(this.computedStylesheet)}const e=Math.floor(this.maxHeight/ga.getValueFor(this)).toString();this.computedStylesheet=(0,Xa.css)`
      :host {
        --listbox-max-height: ${e};
      }
    `;this.$fastController.addStyles(this.computedStylesheet)}}(0,ti.Cg)([(0,Xa.attr)({attribute:"autowidth",mode:"boolean"})],qi.prototype,"autoWidth",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"minimal",mode:"boolean"})],qi.prototype,"minimal",void 0);const Wi=qi.compose({baseName:"combobox",baseClass:be.Combobox,template:be.comboboxTemplate,styles:Ei,shadowOptions:{delegatesFocus:true},indicator:`\n        <svg\n            class="select-indicator"\n            part="select-indicator"\n            viewBox="0 0 12 7"\n            xmlns="http://www.w3.org/2000/svg"\n        >\n            <path\n                d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"\n            />\n        </svg>\n    `});const Ui=(e,t)=>(0,Xa.css)`
  :host {
    display: flex;
    position: relative;
    flex-direction: column;
  }
`;const Xi=(e,t)=>(0,Xa.css)`
  :host {
    display: grid;
    padding: 1px 0;
    box-sizing: border-box;
    width: 100%;
    border-bottom: calc(${Xt} * 1px) solid ${pa};
  }

  :host(.header) {
  }

  :host(.sticky-header) {
    background: ${Br};
    position: sticky;
    top: 0;
  }
`;const Zi=(e,t)=>(0,Xa.css)`
    :host {
      padding: calc(${qt} * 1px) calc(${qt} * 3px);
      color: ${na};
      box-sizing: border-box;
      font-family: ${It};
      font-size: ${Yt};
      line-height: ${Jt};
      font-weight: 400;
      border: transparent calc(${Zt} * 1px) solid;
      overflow: hidden;
      white-space: nowrap;
      border-radius: calc(${_t} * 1px);
    }

    :host(.column-header) {
      font-weight: 600;
    }

    :host(:${be.focusVisible}) {
      outline: calc(${Zt} * 1px) solid ${pr};
      color: ${na};
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        forced-color-adjust: none;
        border-color: transparent;
        background: ${Ya.Field};
        color: ${Ya.FieldText};
      }

      :host(:${be.focusVisible}) {
        border-color: ${Ya.FieldText};
        box-shadow: 0 0 0 2px inset ${Ya.Field};
        color: ${Ya.FieldText};
      }
    `));const Yi=be.DataGridCell.compose({baseName:"data-grid-cell",template:be.dataGridCellTemplate,styles:Zi});const Ji=be.DataGridRow.compose({baseName:"data-grid-row",template:be.dataGridRowTemplate,styles:Xi});const Ki=be.DataGrid.compose({baseName:"data-grid",template:be.dataGridTemplate,styles:Ui});var Qi=o(74291);class en extends be.FoundationElement{}class tn extends((0,be.FormAssociated)(en)){constructor(){super(...arguments);this.proxy=document.createElement("input")}}const on={toView(e){if(e===null||e===undefined){return null}const t=new Date(e);return t.toString()==="Invalid Date"?null:`${t.getFullYear().toString().padStart(4,"0")}-${(t.getMonth()+1).toString().padStart(2,"0")}-${t.getDate().toString().padStart(2,"0")}`},fromView(e){if(e===null||e===undefined){return null}const t=new Date(e);return t.toString()==="Invalid Date"?null:t}};const rn="Invalid Date";class an extends tn{constructor(){super(...arguments);this.step=1;this.isUserInput=false}readOnlyChanged(){if(this.proxy instanceof HTMLInputElement){this.proxy.readOnly=this.readOnly;this.validate()}}autofocusChanged(){if(this.proxy instanceof HTMLInputElement){this.proxy.autofocus=this.autofocus;this.validate()}}listChanged(){if(this.proxy instanceof HTMLInputElement){this.proxy.setAttribute("list",this.list);this.validate()}}maxChanged(e,t){var o;this.max=t<((o=this.min)!==null&&o!==void 0?o:t)?this.min:t;this.value=this.getValidValue(this.value)}minChanged(e,t){var o;this.min=t>((o=this.max)!==null&&o!==void 0?o:t)?this.max:t;this.value=this.getValidValue(this.value)}get valueAsNumber(){return new Date(super.value).valueOf()}set valueAsNumber(e){this.value=new Date(e).toString()}get valueAsDate(){return new Date(super.value)}set valueAsDate(e){this.value=e.toString()}valueChanged(e,t){this.value=this.getValidValue(t);if(t!==this.value){return}if(this.control&&!this.isUserInput){this.control.value=this.value}super.valueChanged(e,this.value);if(e!==undefined&&!this.isUserInput){this.$emit("change")}this.isUserInput=false}getValidValue(e){var t,o;let r=new Date(e);if(r.toString()===rn){r=""}else{r=r>((t=this.max)!==null&&t!==void 0?t:r)?this.max:r;r=r<((o=this.min)!==null&&o!==void 0?o:r)?this.min:r;r=`${r.getFullYear().toString().padStart(4,"0")}-${(r.getMonth()+1).toString().padStart(2,"0")}-${r.getDate().toString().padStart(2,"0")}`}return r}stepUp(){const e=864e5*this.step;const t=new Date(this.value);this.value=new Date(t.toString()!==rn?t.valueOf()+e:0).toString()}stepDown(){const e=864e5*this.step;const t=new Date(this.value);this.value=new Date(t.toString()!==rn?Math.max(t.valueOf()-e,0):0).toString()}connectedCallback(){super.connectedCallback();this.validate();this.control.value=this.value;if(this.autofocus){Xa.DOM.queueUpdate((()=>{this.focus()}))}if(!this.appearance){this.appearance="outline"}}handleTextInput(){this.isUserInput=true;this.value=this.control.value}handleChange(){this.$emit("change")}handleKeyDown(e){const t=e.key;switch(t){case Qi.I5:this.stepUp();return false;case Qi.HX:this.stepDown();return false}return true}handleBlur(){this.control.value=this.value}}(0,ti.Cg)([Xa.attr],an.prototype,"appearance",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"readonly",mode:"boolean"})],an.prototype,"readOnly",void 0);(0,ti.Cg)([(0,Xa.attr)({mode:"boolean"})],an.prototype,"autofocus",void 0);(0,ti.Cg)([Xa.attr],an.prototype,"list",void 0);(0,ti.Cg)([(0,Xa.attr)({converter:Xa.nullableNumberConverter})],an.prototype,"step",void 0);(0,ti.Cg)([(0,Xa.attr)({converter:on})],an.prototype,"max",void 0);(0,ti.Cg)([(0,Xa.attr)({converter:on})],an.prototype,"min",void 0);(0,ti.Cg)([Xa.observable],an.prototype,"defaultSlottedNodes",void 0);(0,be.applyMixins)(an,be.StartEnd,be.DelegatesARIATextbox);const nn=(0,Xa.css)`
  ${(0,be.display)("inline-block")} :host {
    font-family: ${It};
    outline: none;
    user-select: none;
  }

  .root {
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: row;
    color: ${na};
    background: ${Pr};
    border-radius: calc(${_t} * 1px);
    border: calc(${Xt} * 1px) solid ${Ur};
    height: calc(${Ja} * 1px);
  }

  :host([aria-invalid='true']) .root {
    border-color: ${va};
  }

  .control {
    -webkit-appearance: none;
    font: inherit;
    background: transparent;
    border: 0;
    color: inherit;
    height: calc(100% - 4px);
    width: 100%;
    margin-top: auto;
    margin-bottom: auto;
    border: none;
    padding: 0 calc(${qt} * 2px + 1px);
    font-size: ${Yt};
    line-height: ${Jt};
  }

  .control:hover,
  .control:${be.focusVisible},
  .control:disabled,
  .control:active {
    outline: none;
  }

  .label {
    display: block;
    color: ${na};
    cursor: pointer;
    font-size: ${Yt};
    line-height: ${Jt};
    margin-bottom: 4px;
  }

  .label__hidden {
    display: none;
    visibility: hidden;
  }

  .start,
  .end {
    margin: auto;
    fill: currentcolor;
  }

  ::slotted(svg) {
    /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
    width: 16px;
    height: 16px;
  }

  .start {
    margin-inline-start: 11px;
  }

  .end {
    margin-inline-end: 11px;
  }

  :host(:hover:not([disabled])) .root {
    background: ${Rr};
    border-color: ${Xr};
  }

  :host([aria-invalid='true']:hover:not([disabled])) .root {
    border-color: ${$a};
  }

  :host(:active:not([disabled])) .root {
    background: ${Rr};
    border-color: ${Zr};
  }

  :host([aria-invalid='true']:active:not([disabled])) .root {
    border-color: ${xa};
  }

  :host(:focus-within:not([disabled])) .root {
    border-color: ${pr};
    box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
      ${pr};
  }

  :host([aria-invalid='true']:focus-within:not([disabled])) .root {
    border-color: ${ya};
    box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
      ${ya};
  }

  :host([appearance='filled']) .root {
    background: ${Br};
  }

  :host([appearance='filled']:hover:not([disabled])) .root {
    background: ${Or};
  }

  :host([disabled]) .label,
  :host([readonly]) .label,
  :host([readonly]) .control,
  :host([disabled]) .control {
    cursor: ${be.disabledCursor};
  }

  :host([disabled]) {
    opacity: ${Ut};
  }

  :host([disabled]) .control {
    border-color: ${sa};
  }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
    .root,
    :host([appearance='filled']) .root {
      forced-color-adjust: none;
      background: ${Ya.Field};
      border-color: ${Ya.FieldText};
    }
    :host([aria-invalid='true']) .root {
      border-style: dashed;
    }
    :host(:hover:not([disabled])) .root,
    :host([appearance='filled']:hover:not([disabled])) .root,
    :host([appearance='filled']:hover) .root {
      background: ${Ya.Field};
      border-color: ${Ya.Highlight};
    }
    .start,
    .end {
      fill: currentcolor;
    }
    :host([disabled]) {
      opacity: 1;
    }
    :host([disabled]) .root,
    :host([appearance='filled']:hover[disabled]) .root {
      border-color: ${Ya.GrayText};
      background: ${Ya.Field};
    }
    :host(:focus-within:enabled) .root {
      border-color: ${Ya.Highlight};
      box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
        ${Ya.Highlight};
    }
    input::placeholder {
      color: ${Ya.GrayText};
    }
  `));const ln=(e,t)=>(0,Xa.css)`
  ${nn}
`;const sn=(e,t)=>(0,Xa.html)`
  <template class="${e=>e.readOnly?"readonly":""}">
    <label
      part="label"
      for="control"
      class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
    >
      <slot
        ${(0,Xa.slotted)({property:"defaultSlottedNodes",filter:be.whitespaceFilter})}
      ></slot>
    </label>
    <div class="root" part="root">
      ${(0,be.startSlotTemplate)(e,t)}
      <input
        class="control"
        part="control"
        id="control"
        @input="${e=>e.handleTextInput()}"
        @change="${e=>e.handleChange()}"
        ?autofocus="${e=>e.autofocus}"
        ?disabled="${e=>e.disabled}"
        list="${e=>e.list}"
        ?readonly="${e=>e.readOnly}"
        ?required="${e=>e.required}"
        :value="${e=>e.value}"
        type="date"
        aria-atomic="${e=>e.ariaAtomic}"
        aria-busy="${e=>e.ariaBusy}"
        aria-controls="${e=>e.ariaControls}"
        aria-current="${e=>e.ariaCurrent}"
        aria-describedby="${e=>e.ariaDescribedby}"
        aria-details="${e=>e.ariaDetails}"
        aria-disabled="${e=>e.ariaDisabled}"
        aria-errormessage="${e=>e.ariaErrormessage}"
        aria-flowto="${e=>e.ariaFlowto}"
        aria-haspopup="${e=>e.ariaHaspopup}"
        aria-hidden="${e=>e.ariaHidden}"
        aria-invalid="${e=>e.ariaInvalid}"
        aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
        aria-label="${e=>e.ariaLabel}"
        aria-labelledby="${e=>e.ariaLabelledby}"
        aria-live="${e=>e.ariaLive}"
        aria-owns="${e=>e.ariaOwns}"
        aria-relevant="${e=>e.ariaRelevant}"
        aria-roledescription="${e=>e.ariaRoledescription}"
        ${(0,Xa.ref)("control")}
      />
      ${(0,be.endSlotTemplate)(e,t)}
    </div>
  </template>
`;const cn=an.compose({baseName:"date-field",styles:ln,template:sn,shadowOptions:{delegatesFocus:true}});const dn={toView(e){if(e===null||e===undefined){return null}return e===null||e===void 0?void 0:e.toColorString()},fromView(e){if(e===null||e===undefined){return null}const t=S(e);return t?se.create(t.r,t.g,t.b):null}};const un=(0,Xa.css)`
  :host {
    background-color: ${lr};
    color: ${na};
  }
`.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
    :host {
      background-color: ${Ya.ButtonFace};
      box-shadow: 0 0 0 1px ${Ya.CanvasText};
      color: ${Ya.ButtonText};
    }
  `));function hn(e){return(t,o)=>{t[o+"Changed"]=function(t,o){if(o!==undefined&&o!==null){e.setValueFor(this,o)}else{e.deleteValueFor(this)}}}}class pn extends be.FoundationElement{constructor(){super();this.noPaint=false;const e={handleChange:this.noPaintChanged.bind(this)};Xa.Observable.getNotifier(this).subscribe(e,"fillColor");Xa.Observable.getNotifier(this).subscribe(e,"baseLayerLuminance")}noPaintChanged(){if(!this.noPaint&&(this.fillColor!==void 0||this.baseLayerLuminance)){this.$fastController.addStyles(un)}else{this.$fastController.removeStyles(un)}}}(0,ti.Cg)([(0,Xa.attr)({attribute:"no-paint",mode:"boolean"})],pn.prototype,"noPaint",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"fill-color",converter:dn}),hn(lr)],pn.prototype,"fillColor",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"accent-color",converter:dn,mode:"fromView"}),hn(Uo)],pn.prototype,"accentColor",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-color",converter:dn,mode:"fromView"}),hn(qo)],pn.prototype,"neutralColor",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"error-color",converter:dn,mode:"fromView"}),hn(ba)],pn.prototype,"errorColor",void 0);(0,ti.Cg)([(0,Xa.attr)({converter:Xa.nullableNumberConverter}),hn(Et)],pn.prototype,"density",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"design-unit",converter:Xa.nullableNumberConverter}),hn(qt)],pn.prototype,"designUnit",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"direction"}),hn(Wt)],pn.prototype,"direction",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"base-height-multiplier",converter:Xa.nullableNumberConverter}),hn(At)],pn.prototype,"baseHeightMultiplier",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"base-horizontal-spacing-multiplier",converter:Xa.nullableNumberConverter}),hn(Mt)],pn.prototype,"baseHorizontalSpacingMultiplier",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"control-corner-radius",converter:Xa.nullableNumberConverter}),hn(_t)],pn.prototype,"controlCornerRadius",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"stroke-width",converter:Xa.nullableNumberConverter}),hn(Xt)],pn.prototype,"strokeWidth",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"focus-stroke-width",converter:Xa.nullableNumberConverter}),hn(Zt)],pn.prototype,"focusStrokeWidth",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"disabled-opacity",converter:Xa.nullableNumberConverter}),hn(Ut)],pn.prototype,"disabledOpacity",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-minus-2-font-size"}),hn(eo)],pn.prototype,"typeRampMinus2FontSize",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-minus-2-line-height"}),hn(to)],pn.prototype,"typeRampMinus2LineHeight",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-minus-1-font-size"}),hn(Kt)],pn.prototype,"typeRampMinus1FontSize",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-minus-1-line-height"}),hn(Qt)],pn.prototype,"typeRampMinus1LineHeight",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-base-font-size"}),hn(Yt)],pn.prototype,"typeRampBaseFontSize",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-base-line-height"}),hn(Jt)],pn.prototype,"typeRampBaseLineHeight",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-1-font-size"}),hn(oo)],pn.prototype,"typeRampPlus1FontSize",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-1-line-height"}),hn(ro)],pn.prototype,"typeRampPlus1LineHeight",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-2-font-size"}),hn(ao)],pn.prototype,"typeRampPlus2FontSize",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-2-line-height"}),hn(io)],pn.prototype,"typeRampPlus2LineHeight",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-3-font-size"}),hn(no)],pn.prototype,"typeRampPlus3FontSize",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-3-line-height"}),hn(lo)],pn.prototype,"typeRampPlus3LineHeight",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-4-font-size"}),hn(so)],pn.prototype,"typeRampPlus4FontSize",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-4-line-height"}),hn(co)],pn.prototype,"typeRampPlus4LineHeight",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-5-font-size"}),hn(uo)],pn.prototype,"typeRampPlus5FontSize",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-5-line-height"}),hn(ho)],pn.prototype,"typeRampPlus5LineHeight",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-6-font-size"}),hn(po)],pn.prototype,"typeRampPlus6FontSize",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"type-ramp-plus-6-line-height"}),hn(go)],pn.prototype,"typeRampPlus6LineHeight",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"accent-fill-rest-delta",converter:Xa.nullableNumberConverter}),hn(bo)],pn.prototype,"accentFillRestDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"accent-fill-hover-delta",converter:Xa.nullableNumberConverter}),hn(fo)],pn.prototype,"accentFillHoverDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"accent-fill-active-delta",converter:Xa.nullableNumberConverter}),hn(mo)],pn.prototype,"accentFillActiveDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"accent-fill-focus-delta",converter:Xa.nullableNumberConverter}),hn(vo)],pn.prototype,"accentFillFocusDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"accent-foreground-rest-delta",converter:Xa.nullableNumberConverter}),hn($o)],pn.prototype,"accentForegroundRestDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"accent-foreground-hover-delta",converter:Xa.nullableNumberConverter}),hn(xo)],pn.prototype,"accentForegroundHoverDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"accent-foreground-active-delta",converter:Xa.nullableNumberConverter}),hn(yo)],pn.prototype,"accentForegroundActiveDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"accent-foreground-focus-delta",converter:Xa.nullableNumberConverter}),hn(wo)],pn.prototype,"accentForegroundFocusDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-rest-delta",converter:Xa.nullableNumberConverter}),hn(ko)],pn.prototype,"neutralFillRestDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-hover-delta",converter:Xa.nullableNumberConverter}),hn(Co)],pn.prototype,"neutralFillHoverDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-active-delta",converter:Xa.nullableNumberConverter}),hn(Fo)],pn.prototype,"neutralFillActiveDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-focus-delta",converter:Xa.nullableNumberConverter}),hn(So)],pn.prototype,"neutralFillFocusDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-input-rest-delta",converter:Xa.nullableNumberConverter}),hn(To)],pn.prototype,"neutralFillInputRestDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-input-hover-delta",converter:Xa.nullableNumberConverter}),hn(Do)],pn.prototype,"neutralFillInputHoverDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-input-active-delta",converter:Xa.nullableNumberConverter}),hn(Vo)],pn.prototype,"neutralFillInputActiveDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-input-focus-delta",converter:Xa.nullableNumberConverter}),hn(jo)],pn.prototype,"neutralFillInputFocusDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-stealth-rest-delta",converter:Xa.nullableNumberConverter}),hn(zo)],pn.prototype,"neutralFillStealthRestDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-stealth-hover-delta",converter:Xa.nullableNumberConverter}),hn(Bo)],pn.prototype,"neutralFillStealthHoverDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-stealth-active-delta",converter:Xa.nullableNumberConverter}),hn(Oo)],pn.prototype,"neutralFillStealthActiveDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-stealth-focus-delta",converter:Xa.nullableNumberConverter}),hn(Lo)],pn.prototype,"neutralFillStealthFocusDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-strong-hover-delta",converter:Xa.nullableNumberConverter}),hn(No)],pn.prototype,"neutralFillStrongHoverDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-strong-active-delta",converter:Xa.nullableNumberConverter}),hn(Po)],pn.prototype,"neutralFillStrongActiveDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-strong-focus-delta",converter:Xa.nullableNumberConverter}),hn(Ro)],pn.prototype,"neutralFillStrongFocusDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"base-layer-luminance",converter:Xa.nullableNumberConverter}),hn(Gt)],pn.prototype,"baseLayerLuminance",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-fill-layer-rest-delta",converter:Xa.nullableNumberConverter}),hn(Io)],pn.prototype,"neutralFillLayerRestDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-stroke-divider-rest-delta",converter:Xa.nullableNumberConverter}),hn(Eo)],pn.prototype,"neutralStrokeDividerRestDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-stroke-rest-delta",converter:Xa.nullableNumberConverter}),hn(Ao)],pn.prototype,"neutralStrokeRestDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-stroke-hover-delta",converter:Xa.nullableNumberConverter}),hn(Mo)],pn.prototype,"neutralStrokeHoverDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-stroke-active-delta",converter:Xa.nullableNumberConverter}),hn(Go)],pn.prototype,"neutralStrokeActiveDelta",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"neutral-stroke-focus-delta",converter:Xa.nullableNumberConverter}),hn(_o)],pn.prototype,"neutralStrokeFocusDelta",void 0);const gn=(e,t)=>(0,Xa.html)` <slot></slot> `;const bn=(e,t)=>(0,Xa.css)`
  ${(0,be.display)("block")}
`;const fn=pn.compose({baseName:"design-system-provider",template:gn,styles:bn});const mn=(e,t)=>(0,Xa.css)`
  :host([hidden]) {
    display: none;
  }

  :host {
    --elevation: 14;
    --dialog-height: 480px;
    --dialog-width: 640px;
    display: block;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    touch-action: none;
  }

  .positioning-region {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
  }

  .control {
    ${Li}
    margin-top: auto;
    margin-bottom: auto;
    width: var(--dialog-width);
    height: var(--dialog-height);
    background-color: ${lr};
    z-index: 1;
    border-radius: calc(${_t} * 1px);
    border: calc(${Xt} * 1px) solid transparent;
  }
`;const vn=be.Dialog.compose({baseName:"dialog",template:be.dialogTemplate,styles:mn});const $n=(e,t)=>(0,Xa.css)`
  .disclosure {
    transition: height 0.35s;
  }

  .disclosure .invoker::-webkit-details-marker {
    display: none;
  }

  .disclosure .invoker {
    list-style-type: none;
  }

  :host([appearance='accent']) .invoker {
    background: ${dr};
    color: ${fr};
    font-family: ${It};
    font-size: ${Yt};
    border-radius: calc(${_t} * 1px);
    outline: none;
    cursor: pointer;
    margin: 16px 0;
    padding: 12px;
    max-width: max-content;
  }

  :host([appearance='accent']) .invoker:active {
    background: ${hr};
    color: ${vr};
  }

  :host([appearance='accent']) .invoker:hover {
    background: ${ur};
    color: ${mr};
  }

  :host([appearance='lightweight']) .invoker {
    background: transparent;
    color: ${Tr};
    border-bottom: calc(${Xt} * 1px) solid ${Tr};
    cursor: pointer;
    width: max-content;
    margin: 16px 0;
  }

  :host([appearance='lightweight']) .invoker:active {
    border-bottom-color: ${Vr};
  }

  :host([appearance='lightweight']) .invoker:hover {
    border-bottom-color: ${Dr};
  }

  .disclosure[open] .invoker ~ * {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;class xn extends be.Disclosure{constructor(){super(...arguments);this.height=0;this.totalHeight=0}connectedCallback(){super.connectedCallback();if(!this.appearance){this.appearance="accent"}}appearanceChanged(e,t){if(e!==t){this.classList.add(t);this.classList.remove(e)}}onToggle(){super.onToggle();this.details.style.setProperty("height",`${this.disclosureHeight}px`)}setup(){super.setup();const e=()=>this.details.getBoundingClientRect().height;this.show();this.totalHeight=e();this.hide();this.height=e();if(this.expanded){this.show()}}get disclosureHeight(){return this.expanded?this.totalHeight:this.height}}(0,ti.Cg)([Xa.attr],xn.prototype,"appearance",void 0);const yn=xn.compose({baseName:"disclosure",baseClass:be.Disclosure,template:be.disclosureTemplate,styles:$n});const wn=(e,t)=>(0,Xa.css)`
  ${(0,be.display)("block")} :host {
    box-sizing: content-box;
    height: 0;
    margin: calc(${qt} * 1px) 0;
    border-top: calc(${Xt} * 1px) solid ${pa};
    border-left: none;
  }

  :host([orientation='vertical']) {
    height: 100%;
    margin: 0 calc(${qt} * 1px);
    border-top: none;
    border-left: calc(${Xt} * 1px) solid ${pa};
  }
`;const kn=be.Divider.compose({baseName:"divider",template:be.dividerTemplate,styles:wn});class Cn extends be.ListboxElement{sizeChanged(e,t){super.sizeChanged(e,t);this.updateComputedStylesheet()}updateComputedStylesheet(){if(this.computedStylesheet){this.$fastController.removeStyles(this.computedStylesheet)}const e=`${this.size}`;this.computedStylesheet=(0,Xa.css)`
      :host {
        --size: ${e};
      }
    `;this.$fastController.addStyles(this.computedStylesheet)}}const Fn=Cn.compose({baseName:"listbox",baseClass:be.ListboxElement,template:be.listboxTemplate,styles:Gi});const Sn=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("block")} :host {
      --elevation: 11;
      background: ${lr};
      border: calc(${Xt} * 1px) solid transparent;
      ${Li}
      margin: 0;
      border-radius: calc(${_t} * 1px);
      padding: calc(${qt} * 1px) 0;
      max-width: 368px;
      min-width: 64px;
    }

    :host([slot='submenu']) {
      width: max-content;
      margin: 0 calc(${qt} * 1px);
    }

    ::slotted(hr) {
      box-sizing: content-box;
      height: 0;
      margin: 0;
      border: none;
      border-top: calc(${Xt} * 1px) solid ${pa};
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        background: ${Ya.Canvas};
        border-color: ${Ya.CanvasText};
      }
    `));class Tn extends be.Menu{connectedCallback(){super.connectedCallback();lr.setValueFor(this,Ko)}}const Dn=Tn.compose({baseName:"menu",template:be.menuTemplate,styles:Sn});const Vn=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("grid")} :host {
      contain: layout;
      overflow: visible;
      font-family: ${It};
      outline: none;
      box-sizing: border-box;
      height: calc(${Ja} * 1px);
      grid-template-columns: minmax(42px, auto) 1fr minmax(42px, auto);
      grid-template-rows: auto;
      justify-items: center;
      align-items: center;
      padding: 0;
      margin: 0 calc(${qt} * 1px);
      white-space: nowrap;
      background: ${Gr};
      color: ${na};
      fill: currentcolor;
      cursor: pointer;
      font-size: ${Yt};
      line-height: ${Jt};
      border-radius: calc(${_t} * 1px);
      border: calc(${Zt} * 1px) solid transparent;
    }

    :host(:hover) {
      position: relative;
      z-index: 1;
    }

    :host(.indent-0) {
      grid-template-columns: auto 1fr minmax(42px, auto);
    }
    :host(.indent-0) .content {
      grid-column: 1;
      grid-row: 1;
      margin-inline-start: 10px;
    }
    :host(.indent-0) .expand-collapse-glyph-container {
      grid-column: 5;
      grid-row: 1;
    }
    :host(.indent-2) {
      grid-template-columns:
        minmax(42px, auto) minmax(42px, auto) 1fr minmax(42px, auto)
        minmax(42px, auto);
    }
    :host(.indent-2) .content {
      grid-column: 3;
      grid-row: 1;
      margin-inline-start: 10px;
    }
    :host(.indent-2) .expand-collapse-glyph-container {
      grid-column: 5;
      grid-row: 1;
    }
    :host(.indent-2) .start {
      grid-column: 2;
    }
    :host(.indent-2) .end {
      grid-column: 4;
    }

    :host(:${be.focusVisible}) {
      border-color: ${pr};
      background: ${qr};
      color: ${na};
    }

    :host(:hover) {
      background: ${_r};
      color: ${na};
    }

    :host(:active) {
      background: ${Er};
    }

    :host([aria-checked='true']),
    :host(.expanded) {
      background: ${Br};
      color: ${na};
    }

    :host([disabled]) {
      cursor: ${be.disabledCursor};
      opacity: ${Ut};
    }

    :host([disabled]:hover) {
      color: ${na};
      fill: currentcolor;
      background: ${Gr};
    }

    :host([disabled]:hover) .start,
    :host([disabled]:hover) .end,
    :host([disabled]:hover)::slotted(svg) {
      fill: ${na};
    }

    .expand-collapse-glyph {
      /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
      width: 16px;
      height: 16px;
      fill: currentcolor;
    }

    .content {
      grid-column-start: 2;
      justify-self: start;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .start,
    .end {
      display: flex;
      justify-content: center;
    }

    ::slotted(svg) {
      /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
      width: 16px;
      height: 16px;
    }

    :host(:hover) .start,
    :host(:hover) .end,
    :host(:hover)::slotted(svg),
    :host(:active) .start,
    :host(:active) .end,
    :host(:active)::slotted(svg) {
      fill: ${na};
    }

    :host(.indent-0[aria-haspopup='menu']) {
      display: grid;
      grid-template-columns: minmax(42px, auto) auto 1fr minmax(42px, auto) minmax(
          42px,
          auto
        );
      align-items: center;
      min-height: 32px;
    }

    :host(.indent-1[aria-haspopup='menu']),
    :host(.indent-1[role='menuitemcheckbox']),
    :host(.indent-1[role='menuitemradio']) {
      display: grid;
      grid-template-columns: minmax(42px, auto) auto 1fr minmax(42px, auto) minmax(
          42px,
          auto
        );
      align-items: center;
      min-height: 32px;
    }

    :host(.indent-2:not([aria-haspopup='menu'])) .end {
      grid-column: 5;
    }

    :host .input-container,
    :host .expand-collapse-glyph-container {
      display: none;
    }

    :host([aria-haspopup='menu']) .expand-collapse-glyph-container,
    :host([role='menuitemcheckbox']) .input-container,
    :host([role='menuitemradio']) .input-container {
      display: grid;
      margin-inline-end: 10px;
    }

    :host([aria-haspopup='menu']) .content,
    :host([role='menuitemcheckbox']) .content,
    :host([role='menuitemradio']) .content {
      grid-column-start: 3;
    }

    :host([aria-haspopup='menu'].indent-0) .content {
      grid-column-start: 1;
    }

    :host([aria-haspopup='menu']) .end,
    :host([role='menuitemcheckbox']) .end,
    :host([role='menuitemradio']) .end {
      grid-column-start: 4;
    }

    :host .expand-collapse,
    :host .checkbox,
    :host .radio {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      outline: none;
      margin-inline-start: 10px;
    }

    :host .checkbox,
    :host .radio {
      border: calc(${Xt} * 1px) solid ${na};
    }

    :host([aria-checked='true']) .checkbox,
    :host([aria-checked='true']) .radio {
      background: ${dr};
      border-color: ${dr};
    }

    :host .checkbox {
      border-radius: calc(${_t} * 1px);
    }

    :host .radio {
      border-radius: 999px;
    }

    :host .checkbox-indicator,
    :host .radio-indicator,
    :host .expand-collapse-indicator,
    ::slotted([slot='checkbox-indicator']),
    ::slotted([slot='radio-indicator']),
    ::slotted([slot='expand-collapse-indicator']) {
      display: none;
    }

    ::slotted([slot='end']:not(svg)) {
      margin-inline-end: 10px;
      color: ${aa};
    }

    :host([aria-checked='true']) .checkbox-indicator,
    :host([aria-checked='true']) ::slotted([slot='checkbox-indicator']) {
      width: 100%;
      height: 100%;
      display: block;
      fill: ${fr};
      pointer-events: none;
    }

    :host([aria-checked='true']) .radio-indicator {
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      bottom: 4px;
      border-radius: 999px;
      display: block;
      background: ${fr};
      pointer-events: none;
    }

    :host([aria-checked='true']) ::slotted([slot='radio-indicator']) {
      display: block;
      pointer-events: none;
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        border-color: transparent;
        color: ${Ya.ButtonText};
        forced-color-adjust: none;
      }

      :host(:hover) {
        background: ${Ya.Highlight};
        color: ${Ya.HighlightText};
      }

      :host(:hover) .start,
      :host(:hover) .end,
      :host(:hover)::slotted(svg),
      :host(:active) .start,
      :host(:active) .end,
      :host(:active)::slotted(svg) {
        fill: ${Ya.HighlightText};
      }

      :host(.expanded) {
        background: ${Ya.Highlight};
        border-color: ${Ya.Highlight};
        color: ${Ya.HighlightText};
      }

      :host(:${be.focusVisible}) {
        background: ${Ya.Highlight};
        border-color: ${Ya.ButtonText};
        box-shadow: 0 0 0 calc(${Zt} * 1px) inset
          ${Ya.HighlightText};
        color: ${Ya.HighlightText};
        fill: currentcolor;
      }

      :host([disabled]),
      :host([disabled]:hover),
      :host([disabled]:hover) .start,
      :host([disabled]:hover) .end,
      :host([disabled]:hover)::slotted(svg) {
        background: ${Ya.Canvas};
        color: ${Ya.GrayText};
        fill: currentcolor;
        opacity: 1;
      }

      :host .expanded-toggle,
      :host .checkbox,
      :host .radio {
        border-color: ${Ya.ButtonText};
        background: ${Ya.HighlightText};
      }

      :host([checked='true']) .checkbox,
      :host([checked='true']) .radio {
        background: ${Ya.HighlightText};
        border-color: ${Ya.HighlightText};
      }

      :host(:hover) .expanded-toggle,
            :host(:hover) .checkbox,
            :host(:hover) .radio,
            :host(:${be.focusVisible}) .expanded-toggle,
            :host(:${be.focusVisible}) .checkbox,
            :host(:${be.focusVisible}) .radio,
            :host([checked="true"]:hover) .checkbox,
            :host([checked="true"]:hover) .radio,
            :host([checked="true"]:${be.focusVisible}) .checkbox,
            :host([checked="true"]:${be.focusVisible}) .radio {
        border-color: ${Ya.HighlightText};
      }

      :host([aria-checked='true']) {
        background: ${Ya.Highlight};
        color: ${Ya.HighlightText};
      }

      :host([aria-checked='true']) .checkbox-indicator,
      :host([aria-checked='true']) ::slotted([slot='checkbox-indicator']),
      :host([aria-checked='true']) ::slotted([slot='radio-indicator']) {
        fill: ${Ya.Highlight};
      }

      :host([aria-checked='true']) .radio-indicator {
        background: ${Ya.Highlight};
      }

      ::slotted([slot='end']:not(svg)) {
        color: ${Ya.ButtonText};
      }

      :host(:hover) ::slotted([slot="end"]:not(svg)),
            :host(:${be.focusVisible}) ::slotted([slot="end"]:not(svg)) {
        color: ${Ya.HighlightText};
      }
    `),new bi((0,Xa.css)`
        .expand-collapse-glyph {
          transform: rotate(0deg);
        }
      `,(0,Xa.css)`
        .expand-collapse-glyph {
          transform: rotate(180deg);
        }
      `));const jn=be.MenuItem.compose({baseName:"menu-item",template:be.menuItemTemplate,styles:Vn,checkboxIndicator:`\n        <svg\n            part="checkbox-indicator"\n            class="checkbox-indicator"\n            viewBox="0 0 20 20"\n            xmlns="http://www.w3.org/2000/svg"\n        >\n            <path\n                fill-rule="evenodd"\n                clip-rule="evenodd"\n                d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"\n            />\n        </svg>\n    `,expandCollapseGlyph:`\n        <svg\n            viewBox="0 0 16 16"\n            xmlns="http://www.w3.org/2000/svg"\n            class="expand-collapse-glyph"\n            part="expand-collapse-glyph"\n        >\n            <path\n                d="M5.00001 12.3263C5.00124 12.5147 5.05566 12.699 5.15699 12.8578C5.25831 13.0167 5.40243 13.1437 5.57273 13.2242C5.74304 13.3047 5.9326 13.3354 6.11959 13.3128C6.30659 13.2902 6.4834 13.2152 6.62967 13.0965L10.8988 8.83532C11.0739 8.69473 11.2153 8.51658 11.3124 8.31402C11.4096 8.11146 11.46 7.88966 11.46 7.66499C11.46 7.44033 11.4096 7.21853 11.3124 7.01597C11.2153 6.81341 11.0739 6.63526 10.8988 6.49467L6.62967 2.22347C6.48274 2.10422 6.30501 2.02912 6.11712 2.00691C5.92923 1.9847 5.73889 2.01628 5.56823 2.09799C5.39757 2.17969 5.25358 2.30817 5.153 2.46849C5.05241 2.62882 4.99936 2.8144 5.00001 3.00369V12.3263Z"\n            />\n        </svg>\n    `,radioIndicator:`\n        <span part="radio-indicator" class="radio-indicator"></span>\n    `});const zn=(e,t)=>(0,Xa.css)`
  ${nn}

  .controls {
    opacity: 0;
  }

  .step-up-glyph,
  .step-down-glyph {
    display: block;
    padding: 4px 10px;
    cursor: pointer;
  }

  .step-up-glyph:before,
  .step-down-glyph:before {
    content: '';
    display: block;
    border: solid transparent 6px;
  }

  .step-up-glyph:before {
    border-bottom-color: ${na};
  }

  .step-down-glyph:before {
    border-top-color: ${na};
  }

  :host(:hover:not([disabled])) .controls,
  :host(:focus-within:not([disabled])) .controls {
    opacity: 1;
  }
`;class Bn extends be.NumberField{constructor(){super(...arguments);this.appearance="outline"}}(0,ti.Cg)([Xa.attr],Bn.prototype,"appearance",void 0);const On=Bn.compose({baseName:"number-field",baseClass:be.NumberField,styles:zn,template:be.numberFieldTemplate,shadowOptions:{delegatesFocus:true},stepDownGlyph:`\n        <span class="step-down-glyph" part="step-down-glyph"></span>\n    `,stepUpGlyph:`\n        <span class="step-up-glyph" part="step-up-glyph"></span>\n    `});const Ln=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("inline-flex")} :host {
      align-items: center;
      font-family: ${It};
      border-radius: calc(${_t} * 1px);
      border: calc(${Zt} * 1px) solid transparent;
      box-sizing: border-box;
      background: ${Gr};
      color: ${na};
      cursor: pointer;
      flex: 0 0 auto;
      fill: currentcolor;
      font-size: ${Yt};
      height: calc(${Ja} * 1px);
      line-height: ${Jt};
      margin: 0 calc((${qt} - ${Zt}) * 1px);
      outline: none;
      overflow: hidden;
      padding: 0 1ch;
      user-select: none;
      white-space: nowrap;
    }

    :host(:not([disabled]):not([aria-selected='true']):hover) {
      background: ${_r};
    }

    :host(:not([disabled]):not([aria-selected='true']):active) {
      background: ${Er};
    }

    :host([aria-selected='true']) {
      background: ${dr};
      color: ${fr};
    }

    :host(:not([disabled])[aria-selected='true']:hover) {
      background: ${ur};
      color: ${mr};
    }

    :host(:not([disabled])[aria-selected='true']:active) {
      background: ${hr};
      color: ${vr};
    }

    :host([disabled]) {
      cursor: ${be.disabledCursor};
      opacity: ${Ut};
    }

    .content {
      grid-column-start: 2;
      justify-self: start;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .start,
    .end,
    ::slotted(svg) {
      display: flex;
    }

    ::slotted(svg) {
      /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
      height: calc(${qt} * 4px);
      width: calc(${qt} * 4px);
    }

    ::slotted([slot='end']) {
      margin-inline-start: 1ch;
    }

    ::slotted([slot='start']) {
      margin-inline-end: 1ch;
    }

    :host([aria-checked='true'][aria-selected='false']) {
      border-color: ${ea};
    }

    :host([aria-checked='true'][aria-selected='true']) {
      border-color: ${ea};
      box-shadow: 0 0 0 calc(${Zt} * 2 * 1px) inset
        ${oa};
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        border-color: transparent;
        forced-color-adjust: none;
        color: ${Ya.ButtonText};
        fill: currentcolor;
      }

      :host(:not([aria-selected='true']):hover),
      :host([aria-selected='true']) {
        background: ${Ya.Highlight};
        color: ${Ya.HighlightText};
      }

      :host([disabled]),
      :host([disabled][aria-selected='false']:hover) {
        background: ${Ya.Canvas};
        color: ${Ya.GrayText};
        fill: currentcolor;
        opacity: 1;
      }

      :host([aria-checked='true'][aria-selected='false']) {
        background: ${Ya.ButtonFace};
        color: ${Ya.ButtonText};
        border-color: ${Ya.ButtonText};
      }

      :host([aria-checked='true'][aria-selected='true']),
      :host([aria-checked='true'][aria-selected='true']:hover) {
        background: ${Ya.Highlight};
        color: ${Ya.HighlightText};
        border-color: ${Ya.ButtonText};
      }
    `));const Hn=be.ListboxOption.compose({baseName:"option",template:be.listboxOptionTemplate,styles:Ln});const Nn=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("flex")} :host {
      align-items: center;
      outline: none;
      height: calc(${qt} * 1px);
      margin: calc(${qt} * 1px) 0;
    }

    .progress {
      background-color: ${Br};
      border-radius: calc(${qt} * 1px);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
    }

    .determinate {
      background-color: ${Tr};
      border-radius: calc(${qt} * 1px);
      height: 100%;
      transition: all 0.2s ease-in-out;
      display: flex;
    }

    .indeterminate {
      height: 100%;
      border-radius: calc(${qt} * 1px);
      display: flex;
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    .indeterminate-indicator-1 {
      position: absolute;
      opacity: 0;
      height: 100%;
      background-color: ${Tr};
      border-radius: calc(${qt} * 1px);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
      width: 40%;
      animation: indeterminate-1 2s infinite;
    }

    .indeterminate-indicator-2 {
      position: absolute;
      opacity: 0;
      height: 100%;
      background-color: ${Tr};
      border-radius: calc(${qt} * 1px);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
      width: 60%;
      animation: indeterminate-2 2s infinite;
    }

    :host([paused]) .indeterminate-indicator-1,
    :host([paused]) .indeterminate-indicator-2 {
      animation-play-state: paused;
      background-color: ${Br};
    }

    :host([paused]) .determinate {
      background-color: ${aa};
    }

    @keyframes indeterminate-1 {
      0% {
        opacity: 1;
        transform: translateX(-100%);
      }
      70% {
        opacity: 1;
        transform: translateX(300%);
      }
      70.01% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        transform: translateX(300%);
      }
    }

    @keyframes indeterminate-2 {
      0% {
        opacity: 0;
        transform: translateX(-150%);
      }
      29.99% {
        opacity: 0;
      }
      30% {
        opacity: 1;
        transform: translateX(-150%);
      }
      100% {
        transform: translateX(166.66%);
        opacity: 1;
      }
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      .progress {
        forced-color-adjust: none;
        background-color: ${Ya.Field};
        box-shadow: 0 0 0 1px inset ${Ya.FieldText};
      }
      .determinate,
      .indeterminate-indicator-1,
      .indeterminate-indicator-2 {
        forced-color-adjust: none;
        background-color: ${Ya.FieldText};
      }
      :host([paused]) .determinate,
      :host([paused]) .indeterminate-indicator-1,
      :host([paused]) .indeterminate-indicator-2 {
        background-color: ${Ya.GrayText};
      }
    `));const Pn=be.BaseProgress.compose({baseName:"progress",template:be.progressTemplate,styles:Nn,indeterminateIndicator1:`\n        <span class="indeterminate-indicator-1" part="indeterminate-indicator-1"></span>\n    `,indeterminateIndicator2:`\n        <span class="indeterminate-indicator-2" part="indeterminate-indicator-2"></span>\n    `});const Rn=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("flex")} :host {
      align-items: center;
      outline: none;
      height: calc(${Ja} * 1px);
      width: calc(${Ja} * 1px);
      margin: calc(${Ja} * 1px) 0;
    }

    .progress {
      height: 100%;
      width: 100%;
    }

    .background {
      stroke: ${Br};
      fill: none;
      stroke-width: 2px;
    }

    .determinate {
      stroke: ${Tr};
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
    }

    .indeterminate-indicator-1 {
      stroke: ${Tr};
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
      animation: spin-infinite 2s linear infinite;
    }

    :host([paused]) .indeterminate-indicator-1 {
      animation-play-state: paused;
      stroke: ${Br};
    }

    :host([paused]) .determinate {
      stroke: ${aa};
    }

    @keyframes spin-infinite {
      0% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(0deg);
      }
      50% {
        stroke-dasharray: 21.99px 21.99px;
        transform: rotate(450deg);
      }
      100% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(1080deg);
      }
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      .indeterminate-indicator-1,
      .determinate {
        stroke: ${Ya.FieldText};
      }
      .background {
        stroke: ${Ya.Field};
      }
      :host([paused]) .indeterminate-indicator-1 {
        stroke: ${Ya.Field};
      }
      :host([paused]) .determinate {
        stroke: ${Ya.GrayText};
      }
    `));const In=be.BaseProgress.compose({baseName:"progress-ring",template:be.progressRingTemplate,styles:Rn,indeterminateIndicator:`\n        <svg class="progress" part="progress" viewBox="0 0 16 16">\n            <circle\n                class="background"\n                part="background"\n                cx="8px"\n                cy="8px"\n                r="7px"\n            ></circle>\n            <circle\n                class="indeterminate-indicator-1"\n                part="indeterminate-indicator-1"\n                cx="8px"\n                cy="8px"\n                r="7px"\n            ></circle>\n        </svg>\n    `});const An=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("inline-flex")} :host {
      --input-size: calc((${Ja} / 2) + ${qt});
      align-items: center;
      outline: none;
      margin: calc(${qt} * 1px) 0;
      /* Chromium likes to select label text or the default slot when
                the radio is clicked. Maybe there is a better solution here? */
      user-select: none;
      position: relative;
      flex-direction: row;
      transition: all 0.2s ease-in-out;
    }

    .control {
      position: relative;
      width: calc((${Ja} / 2 + ${qt}) * 1px);
      height: calc((${Ja} / 2 + ${qt}) * 1px);
      box-sizing: border-box;
      border-radius: 999px;
      border: calc(${Xt} * 1px) solid ${sa};
      background: ${Pr};
      outline: none;
      cursor: pointer;
    }

    :host([aria-invalid='true']) .control {
      border-color: ${va};
    }

    .label {
      font-family: ${It};
      color: ${na};
      padding-inline-start: calc(${qt} * 2px + 2px);
      margin-inline-end: calc(${qt} * 2px + 2px);
      cursor: pointer;
      font-size: ${Yt};
      line-height: ${Jt};
    }

    .label__hidden {
      display: none;
      visibility: hidden;
    }

    .control,
    .checked-indicator {
      flex-shrink: 0;
    }

    .checked-indicator {
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 999px;
      display: inline-block;
      background: ${fr};
      fill: ${fr};
      opacity: 0;
      pointer-events: none;
    }

    :host(:not([disabled])) .control:hover {
      background: ${Rr};
      border-color: ${ca};
    }

    :host([aria-invalid='true']:not([disabled])) .control:hover {
      border-color: ${$a};
    }

    :host(:not([disabled])) .control:active {
      background: ${Ir};
      border-color: ${da};
    }

    :host([aria-invalid='true']:not([disabled])) .control:active {
      border-color: ${xa};
    }

    :host(:${be.focusVisible}) .control {
      outline: solid calc(${Zt} * 1px) ${pr};
    }

    :host([aria-invalid='true']:${be.focusVisible}) .control {
      outline-color: ${ya};
    }

    :host([aria-checked='true']) .control {
      background: ${dr};
      border: calc(${Xt} * 1px) solid ${dr};
    }

    :host([aria-invalid='true'][aria-checked='true']) .control {
      background-color: ${va};
      border-color: ${va};
    }

    :host([aria-checked='true']:not([disabled])) .control:hover {
      background: ${ur};
      border: calc(${Xt} * 1px) solid ${ur};
    }

    :host([aria-invalid='true'][aria-checked='true']:not([disabled]))
      .control:hover {
      background-color: ${$a};
      border-color: ${$a};
    }

    :host([aria-checked='true']:not([disabled]))
      .control:hover
      .checked-indicator {
      background: ${mr};
      fill: ${mr};
    }

    :host([aria-checked='true']:not([disabled])) .control:active {
      background: ${hr};
      border: calc(${Xt} * 1px) solid ${hr};
    }

    :host([aria-invalid='true'][aria-checked='true']:not([disabled]))
      .control:active {
      background-color: ${xa};
      border-color: ${xa};
    }

    :host([aria-checked='true']:not([disabled]))
      .control:active
      .checked-indicator {
      background: ${vr};
      fill: ${vr};
    }

    :host([aria-checked="true"]:${be.focusVisible}:not([disabled])) .control {
      outline-offset: 2px;
      outline: solid calc(${Zt} * 1px) ${pr};
    }

    :host([aria-invalid='true'][aria-checked="true"]:${be.focusVisible}:not([disabled])) .control {
      outline-color: ${ya};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
      cursor: ${be.disabledCursor};
    }

    :host([aria-checked='true']) .checked-indicator {
      opacity: 1;
    }

    :host([disabled]) {
      opacity: ${Ut};
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      .control,
      :host([aria-checked='true']:not([disabled])) .control {
        forced-color-adjust: none;
        border-color: ${Ya.FieldText};
        background: ${Ya.Field};
      }
      :host([aria-invalid='true']) {
        border-style: dashed;
      }
      :host(:not([disabled])) .control:hover {
        border-color: ${Ya.Highlight};
        background: ${Ya.Field};
      }
      :host([aria-checked='true']:not([disabled])) .control:hover,
      :host([aria-checked='true']:not([disabled])) .control:active {
        border-color: ${Ya.Highlight};
        background: ${Ya.Highlight};
      }
      :host([aria-checked='true']) .checked-indicator {
        background: ${Ya.Highlight};
        fill: ${Ya.Highlight};
      }
      :host([aria-checked='true']:not([disabled]))
        .control:hover
        .checked-indicator,
      :host([aria-checked='true']:not([disabled]))
        .control:active
        .checked-indicator {
        background: ${Ya.HighlightText};
        fill: ${Ya.HighlightText};
      }
      :host(:${be.focusVisible}) .control {
        border-color: ${Ya.Highlight};
        outline-offset: 2px;
        outline: solid calc(${Zt} * 1px) ${Ya.FieldText};
      }
      :host([aria-checked="true"]:${be.focusVisible}:not([disabled])) .control {
        border-color: ${Ya.Highlight};
        outline: solid calc(${Zt} * 1px) ${Ya.FieldText};
      }
      :host([disabled]) {
        forced-color-adjust: none;
        opacity: 1;
      }
      :host([disabled]) .label {
        color: ${Ya.GrayText};
      }
      :host([disabled]) .control,
      :host([aria-checked='true'][disabled]) .control:hover,
      .control:active {
        background: ${Ya.Field};
        border-color: ${Ya.GrayText};
      }
      :host([disabled]) .checked-indicator,
      :host([aria-checked='true'][disabled]) .control:hover .checked-indicator {
        fill: ${Ya.GrayText};
        background: ${Ya.GrayText};
      }
    `));const Mn=(e,t)=>(0,Xa.html)`
  <template
    role="radio"
    aria-checked="${e=>e.checked}"
    aria-required="${e=>e.required}"
    aria-disabled="${e=>e.disabled}"
    aria-readonly="${e=>e.readOnly}"
    @keypress="${(e,t)=>e.keypressHandler(t.event)}"
    @click="${(e,t)=>e.clickHandler(t.event)}"
  >
    <div part="control" class="control">
      <slot name="checked-indicator">
        ${t.checkedIndicator||""}
      </slot>
    </div>
    <label
      part="label"
      class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
    >
      <slot ${(0,Xa.slotted)("defaultSlottedNodes")}></slot>
    </label>
  </template>
`;class Gn extends be.Radio{}const _n=Gn.compose({baseName:"radio",baseClass:be.Radio,template:Mn,styles:An,checkedIndicator:`\n        <div part="checked-indicator" class="checked-indicator"></div>\n    `});const En=(e,t)=>(0,Xa.css)`
  ${(0,be.display)("flex")} :host {
    align-items: flex-start;
    margin: calc(${qt} * 1px) 0;
    flex-direction: column;
  }
  .positioning-region {
    display: flex;
    flex-wrap: wrap;
  }
  :host([orientation='vertical']) .positioning-region {
    flex-direction: column;
  }
  :host([orientation='horizontal']) .positioning-region {
    flex-direction: row;
  }
`;class qn extends be.RadioGroup{constructor(){super();const e=Xa.Observable.getNotifier(this);const t={handleChange(e,t){if(t==="slottedRadioButtons"){e.ariaInvalidChanged()}}};e.subscribe(t,"slottedRadioButtons")}ariaInvalidChanged(){if(this.slottedRadioButtons){this.slottedRadioButtons.forEach((e=>{var t;e.setAttribute("aria-invalid",(t=this.getAttribute("aria-invalid"))!==null&&t!==void 0?t:"false")}))}}}const Wn=qn.compose({baseName:"radio-group",baseClass:be.RadioGroup,template:be.radioGroupTemplate,styles:En});const Un=be.DesignToken.create("clear-button-hover").withDefault((e=>{const t=Mr.getValueFor(e);const o=zr.getValueFor(e);return t.evaluate(e,o.evaluate(e).hover).hover}));const Xn=be.DesignToken.create("clear-button-active").withDefault((e=>{const t=Mr.getValueFor(e);const o=zr.getValueFor(e);return t.evaluate(e,o.evaluate(e).hover).active}));const Zn=(e,t)=>(0,Xa.css)`
  ${nn}

  .control::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  .control:hover,
    .control:${be.focusVisible},
    .control:disabled,
    .control:active {
    outline: none;
  }

  .clear-button {
    height: calc(100% - 2px);
    opacity: 0;
    margin: 1px;
    background: transparent;
    color: ${na};
    fill: currentcolor;
    border: none;
    border-radius: calc(${_t} * 1px);
    min-width: calc(${Ja} * 1px);
    font-size: ${Yt};
    line-height: ${Jt};
    outline: none;
    font-family: ${It};
    padding: 0 calc((10 + (${qt} * 2 * ${Et})) * 1px);
  }

  .clear-button:hover {
    background: ${_r};
  }

  .clear-button:active {
    background: ${Er};
  }

  :host([appearance='filled']) .clear-button:hover {
    background: ${Un};
  }

  :host([appearance='filled']) .clear-button:active {
    background: ${Xn};
  }

  .input-wrapper {
    display: flex;
    position: relative;
    width: 100%;
  }

  .start,
  .end {
    display: flex;
    margin: 1px;
    fill: currentcolor;
  }

  ::slotted([slot='end']) {
    height: 100%;
  }

  .end {
    margin-inline-end: 1px;
    height: calc(100% - 2px);
  }

  ::slotted(svg) {
    /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
    width: 16px;
    height: 16px;
    margin-inline-end: 11px;
    margin-inline-start: 11px;
    margin-top: auto;
    margin-bottom: auto;
  }

  .clear-button__hidden {
    opacity: 0;
  }

  :host(:hover:not([disabled], [readOnly])) .clear-button,
  :host(:active:not([disabled], [readOnly])) .clear-button,
  :host(:focus-within:not([disabled], [readOnly])) .clear-button {
    opacity: 1;
  }

  :host(:hover:not([disabled], [readOnly])) .clear-button__hidden,
  :host(:active:not([disabled], [readOnly])) .clear-button__hidden,
  :host(:focus-within:not([disabled], [readOnly])) .clear-button__hidden {
    opacity: 0;
  }
`;class Yn extends be.Search{constructor(){super(...arguments);this.appearance="outline"}}(0,ti.Cg)([Xa.attr],Yn.prototype,"appearance",void 0);const Jn=Yn.compose({baseName:"search",baseClass:be.Search,template:be.searchTemplate,styles:Zn,shadowOptions:{delegatesFocus:true}});const Kn=Zn;class Qn extends be.Select{constructor(){super(...arguments);this.listboxScrollWidth=""}autoWidthChanged(e,t){if(t){this.setAutoWidth()}else{this.style.removeProperty("width")}}setAutoWidth(){if(!this.autoWidth||!this.isConnected){return}let e=this.listbox.getBoundingClientRect().width;if(e===0&&this.listbox.hidden){Object.assign(this.listbox.style,{visibility:"hidden"});this.listbox.removeAttribute("hidden");e=this.listbox.getBoundingClientRect().width;this.listbox.setAttribute("hidden","");this.listbox.style.removeProperty("visibility")}if(e>0){Object.assign(this.style,{width:`${e}px`})}}connectedCallback(){super.connectedCallback();this.setAutoWidth();if(this.listbox){lr.setValueFor(this.listbox,Ko)}}slottedOptionsChanged(e,t){super.slottedOptionsChanged(e,t);this.setAutoWidth()}get listboxMaxHeight(){return Math.floor(this.maxHeight/ga.getValueFor(this)).toString()}listboxScrollWidthChanged(){this.updateComputedStylesheet()}get selectSize(){var e;return`${(e=this.size)!==null&&e!==void 0?e:this.multiple?4:0}`}multipleChanged(e,t){super.multipleChanged(e,t);this.updateComputedStylesheet()}maxHeightChanged(e,t){if(this.collapsible){this.updateComputedStylesheet()}}setPositioning(){super.setPositioning();this.updateComputedStylesheet()}sizeChanged(e,t){super.sizeChanged(e,t);this.updateComputedStylesheet();if(this.collapsible){requestAnimationFrame((()=>{this.listbox.style.setProperty("display","flex");this.listbox.style.setProperty("overflow","visible");this.listbox.style.setProperty("visibility","hidden");this.listbox.style.setProperty("width","auto");this.listbox.hidden=false;this.listboxScrollWidth=`${this.listbox.scrollWidth}`;this.listbox.hidden=true;this.listbox.style.removeProperty("display");this.listbox.style.removeProperty("overflow");this.listbox.style.removeProperty("visibility");this.listbox.style.removeProperty("width")}));return}this.listboxScrollWidth=""}updateComputedStylesheet(){if(this.computedStylesheet){this.$fastController.removeStyles(this.computedStylesheet)}this.computedStylesheet=(0,Xa.css)`
      :host {
        --listbox-max-height: ${this.listboxMaxHeight};
        --listbox-scroll-width: ${this.listboxScrollWidth};
        --size: ${this.selectSize};
      }
    `;this.$fastController.addStyles(this.computedStylesheet)}}(0,ti.Cg)([(0,Xa.attr)({attribute:"autowidth",mode:"boolean"})],Qn.prototype,"autoWidth",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"minimal",mode:"boolean"})],Qn.prototype,"minimal",void 0);(0,ti.Cg)([Xa.observable],Qn.prototype,"listboxScrollWidth",void 0);const el=Qn.compose({baseName:"select",baseClass:be.Select,template:be.selectTemplate,styles:_i,indicator:`\n        <svg\n            class="select-indicator"\n            part="select-indicator"\n            viewBox="0 0 12 7"\n            xmlns="http://www.w3.org/2000/svg"\n        >\n            <path\n                d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"\n            />\n        </svg>\n    `});const tl=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("block")} :host {
      --skeleton-fill-default: #e1dfdd;
      overflow: hidden;
      width: 100%;
      position: relative;
      background-color: var(--skeleton-fill, var(--skeleton-fill-default));
      --skeleton-animation-gradient-default: linear-gradient(
        270deg,
        var(--skeleton-fill, var(--skeleton-fill-default)) 0%,
        #f3f2f1 51.13%,
        var(--skeleton-fill, var(--skeleton-fill-default)) 100%
      );
      --skeleton-animation-timing-default: ease-in-out;
    }

    :host([shape='rect']) {
      border-radius: calc(${_t} * 1px);
    }

    :host([shape='circle']) {
      border-radius: 100%;
      overflow: hidden;
    }

    object {
      position: absolute;
      width: 100%;
      height: auto;
      z-index: 2;
    }

    object img {
      width: 100%;
      height: auto;
    }

    ${(0,be.display)("block")} span.shimmer {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: var(
        --skeleton-animation-gradient,
        var(--skeleton-animation-gradient-default)
      );
      background-size: 0px 0px / 90% 100%;
      background-repeat: no-repeat;
      background-color: var(--skeleton-animation-fill, ${Br});
      animation: shimmer 2s infinite;
      animation-timing-function: var(
        --skeleton-animation-timing,
        var(--skeleton-timing-default)
      );
      animation-direction: normal;
      z-index: 1;
    }

    ::slotted(svg) {
      z-index: 2;
    }

    ::slotted(.pattern) {
      width: 100%;
      height: 100%;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        forced-color-adjust: none;
        background-color: ${Ya.ButtonFace};
        box-shadow: 0 0 0 1px ${Ya.ButtonText};
      }

      ${(0,be.display)("block")} span.shimmer {
        display: none;
      }
    `));const ol=be.Skeleton.compose({baseName:"skeleton",template:be.skeletonTemplate,styles:tl});const rl=(0,Xa.css)`
  .track-start {
    left: 0;
  }
`;const al=(0,Xa.css)`
  .track-start {
    right: 0;
  }
`;const il=(e,t)=>(0,Xa.css)`
    :host([hidden]) {
      display: none;
    }

    ${(0,be.display)("inline-grid")} :host {
      --thumb-size: calc(${Ja} * 0.5 - ${qt});
      --thumb-translate: calc(
        var(--thumb-size) * -0.5 + var(--track-width) / 2
      );
      --track-overhang: calc((${qt} / 2) * -1);
      --track-width: ${qt};
      --jp-slider-height: calc(var(--thumb-size) * 10);
      align-items: center;
      width: 100%;
      margin: calc(${qt} * 1px) 0;
      user-select: none;
      box-sizing: border-box;
      border-radius: calc(${_t} * 1px);
      outline: none;
      cursor: pointer;
    }
    :host([orientation='horizontal']) .positioning-region {
      position: relative;
      margin: 0 8px;
      display: grid;
      grid-template-rows: calc(var(--thumb-size) * 1px) 1fr;
    }
    :host([orientation='vertical']) .positioning-region {
      position: relative;
      margin: 0 8px;
      display: grid;
      height: 100%;
      grid-template-columns: calc(var(--thumb-size) * 1px) 1fr;
    }

    :host(:${be.focusVisible}) .thumb-cursor {
      box-shadow:
        0 0 0 2px ${lr},
        0 0 0 calc((2 + ${Zt}) * 1px) ${pr};
    }

    :host([aria-invalid='true']:${be.focusVisible}) .thumb-cursor {
      box-shadow:
        0 0 0 2px ${lr},
        0 0 0 calc((2 + ${Zt}) * 1px) ${ya};
    }

    .thumb-container {
      position: absolute;
      height: calc(var(--thumb-size) * 1px);
      width: calc(var(--thumb-size) * 1px);
      transition: all 0.2s ease;
      color: ${na};
      fill: currentcolor;
    }
    .thumb-cursor {
      border: none;
      width: calc(var(--thumb-size) * 1px);
      height: calc(var(--thumb-size) * 1px);
      background: ${na};
      border-radius: calc(${_t} * 1px);
    }
    .thumb-cursor:hover {
      background: ${na};
      border-color: ${ca};
    }
    .thumb-cursor:active {
      background: ${na};
    }
    .track-start {
      background: ${Tr};
      position: absolute;
      height: 100%;
      left: 0;
      border-radius: calc(${_t} * 1px);
    }
    :host([aria-invalid='true']) .track-start {
      background-color: ${va};
    }
    :host([orientation='horizontal']) .thumb-container {
      transform: translateX(calc(var(--thumb-size) * 0.5px))
        translateY(calc(var(--thumb-translate) * 1px));
    }
    :host([orientation='vertical']) .thumb-container {
      transform: translateX(calc(var(--thumb-translate) * 1px))
        translateY(calc(var(--thumb-size) * 0.5px));
    }
    :host([orientation='horizontal']) {
      min-width: calc(var(--thumb-size) * 1px);
    }
    :host([orientation='horizontal']) .track {
      right: calc(var(--track-overhang) * 1px);
      left: calc(var(--track-overhang) * 1px);
      align-self: start;
      height: calc(var(--track-width) * 1px);
    }
    :host([orientation='vertical']) .track {
      top: calc(var(--track-overhang) * 1px);
      bottom: calc(var(--track-overhang) * 1px);
      width: calc(var(--track-width) * 1px);
      height: 100%;
    }
    .track {
      background: ${sa};
      position: absolute;
      border-radius: calc(${_t} * 1px);
    }
    :host([orientation='vertical']) {
      height: calc(var(--fast-slider-height) * 1px);
      min-height: calc(var(--thumb-size) * 1px);
      min-width: calc(${qt} * 20px);
    }
    :host([orientation='vertical']) .track-start {
      height: auto;
      width: 100%;
      top: 0;
    }
    :host([disabled]),
    :host([readonly]) {
      cursor: ${be.disabledCursor};
    }
    :host([disabled]) {
      opacity: ${Ut};
    }
  `.withBehaviors(new bi(rl,al),(0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      .thumb-cursor {
        forced-color-adjust: none;
        border-color: ${Ya.FieldText};
        background: ${Ya.FieldText};
      }
      .thumb-cursor:hover,
      .thumb-cursor:active {
        background: ${Ya.Highlight};
      }
      .track {
        forced-color-adjust: none;
        background: ${Ya.FieldText};
      }
      :host(:${be.focusVisible}) .thumb-cursor {
        border-color: ${Ya.Highlight};
      }
      :host([disabled]) {
        opacity: 1;
      }
      :host([disabled]) .track,
      :host([disabled]) .thumb-cursor {
        forced-color-adjust: none;
        background: ${Ya.GrayText};
      }

      :host(:${be.focusVisible}) .thumb-cursor {
        background: ${Ya.Highlight};
        border-color: ${Ya.Highlight};
        box-shadow:
          0 0 0 2px ${Ya.Field},
          0 0 0 4px ${Ya.FieldText};
      }
    `));class nl extends be.Slider{}const ll=nl.compose({baseName:"slider",baseClass:be.Slider,template:be.sliderTemplate,styles:il,thumb:`\n        <div class="thumb-cursor"></div>\n    `});var sl=o(67002);const cl=(0,Xa.css)`
  :host {
    align-self: start;
    grid-row: 2;
    margin-top: -2px;
    height: calc((${Ja} / 2 + ${qt}) * 1px);
    width: auto;
  }
  .container {
    grid-template-rows: auto auto;
    grid-template-columns: 0;
  }
  .label {
    margin: 2px 0;
  }
`;const dl=(0,Xa.css)`
  :host {
    justify-self: start;
    grid-column: 2;
    margin-left: 2px;
    height: auto;
    width: calc((${Ja} / 2 + ${qt}) * 1px);
  }
  .container {
    grid-template-columns: auto auto;
    grid-template-rows: 0;
    min-width: calc(var(--thumb-size) * 1px);
    height: calc(var(--thumb-size) * 1px);
  }
  .mark {
    transform: rotate(90deg);
    align-self: center;
  }
  .label {
    margin-left: calc((${qt} / 2) * 3px);
    align-self: center;
  }
`;const ul=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("block")} :host {
      font-family: ${It};
      color: ${na};
      fill: currentcolor;
    }
    .root {
      position: absolute;
      display: grid;
    }
    .container {
      display: grid;
      justify-self: center;
    }
    .label {
      justify-self: center;
      align-self: center;
      white-space: nowrap;
      max-width: 30px;
    }
    .mark {
      width: calc((${qt} / 4) * 1px);
      height: calc(${Ja} * 0.25 * 1px);
      background: ${sa};
      justify-self: center;
    }
    :host(.disabled) {
      opacity: ${Ut};
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      .mark {
        forced-color-adjust: none;
        background: ${Ya.FieldText};
      }
      :host(.disabled) {
        forced-color-adjust: none;
        opacity: 1;
      }
      :host(.disabled) .label {
        color: ${Ya.GrayText};
      }
      :host(.disabled) .mark {
        background: ${Ya.GrayText};
      }
    `));class hl extends be.SliderLabel{sliderOrientationChanged(){if(this.sliderOrientation===sl.t.horizontal){this.$fastController.addStyles(cl);this.$fastController.removeStyles(dl)}else{this.$fastController.addStyles(dl);this.$fastController.removeStyles(cl)}}}const pl=hl.compose({baseName:"slider-label",baseClass:be.SliderLabel,template:be.sliderLabelTemplate,styles:ul});const gl=(e,t)=>(0,Xa.css)`
    :host([hidden]) {
      display: none;
    }

    ${(0,be.display)("inline-flex")} :host {
      align-items: center;
      outline: none;
      font-family: ${It};
      margin: calc(${qt} * 1px) 0;
      ${""} user-select: none;
    }

    :host([disabled]) {
      opacity: ${Ut};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .switch,
    :host([disabled]) .switch {
      cursor: ${be.disabledCursor};
    }

    .switch {
      position: relative;
      outline: none;
      box-sizing: border-box;
      width: calc(${Ja} * 1px);
      height: calc((${Ja} / 2 + ${qt}) * 1px);
      background: ${Pr};
      border-radius: calc(${_t} * 1px);
      border: calc(${Xt} * 1px) solid ${sa};
    }

    :host([aria-invalid='true']) .switch {
      border-color: ${va};
    }

    .switch:hover {
      background: ${Rr};
      border-color: ${ca};
      cursor: pointer;
    }

    :host([disabled]) .switch:hover,
    :host([readonly]) .switch:hover {
      background: ${Rr};
      border-color: ${ca};
      cursor: ${be.disabledCursor};
    }

    :host([aria-invalid='true'][disabled]) .switch:hover,
    :host([aria-invalid='true'][readonly]) .switch:hover {
      border-color: ${$a};
    }

    :host(:not([disabled])) .switch:active {
      background: ${Ir};
      border-color: ${da};
    }

    :host([aria-invalid='true']:not([disabled])) .switch:active {
      border-color: ${xa};
    }

    :host(:${be.focusVisible}) .switch {
      outline-offset: 2px;
      outline: solid calc(${Zt} * 1px) ${pr};
    }

    :host([aria-invalid='true']:${be.focusVisible}) .switch {
      outline-color: ${ya};
    }

    .checked-indicator {
      position: absolute;
      top: 5px;
      bottom: 5px;
      background: ${na};
      border-radius: calc(${_t} * 1px);
      transition: all 0.2s ease-in-out;
    }

    .status-message {
      color: ${na};
      cursor: pointer;
      font-size: ${Yt};
      line-height: ${Jt};
    }

    :host([disabled]) .status-message,
    :host([readonly]) .status-message {
      cursor: ${be.disabledCursor};
    }

    .label {
      color: ${na};
      margin-inline-end: calc(${qt} * 2px + 2px);
      font-size: ${Yt};
      line-height: ${Jt};
      cursor: pointer;
    }

    .label__hidden {
      display: none;
      visibility: hidden;
    }

    ::slotted([slot='checked-message']),
    ::slotted([slot='unchecked-message']) {
      margin-inline-start: calc(${qt} * 2px + 2px);
    }

    :host([aria-checked='true']) .checked-indicator {
      background: ${fr};
    }

    :host([aria-checked='true']) .switch {
      background: ${dr};
      border-color: ${dr};
    }

    :host([aria-checked='true']:not([disabled])) .switch:hover {
      background: ${ur};
      border-color: ${ur};
    }

    :host([aria-invalid='true'][aria-checked='true']) .switch {
      background-color: ${va};
      border-color: ${va};
    }

    :host([aria-invalid='true'][aria-checked='true']:not([disabled]))
      .switch:hover {
      background-color: ${$a};
      border-color: ${$a};
    }

    :host([aria-checked='true']:not([disabled]))
      .switch:hover
      .checked-indicator {
      background: ${mr};
    }

    :host([aria-checked='true']:not([disabled])) .switch:active {
      background: ${hr};
      border-color: ${hr};
    }

    :host([aria-invalid='true'][aria-checked='true']:not([disabled]))
      .switch:active {
      background-color: ${xa};
      border-color: ${xa};
    }

    :host([aria-checked='true']:not([disabled]))
      .switch:active
      .checked-indicator {
      background: ${vr};
    }

    :host([aria-checked="true"]:${be.focusVisible}:not([disabled])) .switch {
      outline: solid calc(${Zt} * 1px) ${pr};
    }

    :host([aria-invalid='true'][aria-checked="true"]:${be.focusVisible}:not([disabled])) .switch {
      outline-color: ${ya};
    }

    .unchecked-message {
      display: block;
    }

    .checked-message {
      display: none;
    }

    :host([aria-checked='true']) .unchecked-message {
      display: none;
    }

    :host([aria-checked='true']) .checked-message {
      display: block;
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      .checked-indicator,
      :host(:not([disabled])) .switch:active .checked-indicator {
        forced-color-adjust: none;
        background: ${Ya.FieldText};
      }
      .switch {
        forced-color-adjust: none;
        background: ${Ya.Field};
        border-color: ${Ya.FieldText};
      }
      :host([aria-invalid='true']) .switch {
        border-style: dashed;
      }
      :host(:not([disabled])) .switch:hover {
        background: ${Ya.HighlightText};
        border-color: ${Ya.Highlight};
      }
      :host([aria-checked='true']) .switch {
        background: ${Ya.Highlight};
        border-color: ${Ya.Highlight};
      }
      :host([aria-checked='true']:not([disabled])) .switch:hover,
      :host(:not([disabled])) .switch:active {
        background: ${Ya.HighlightText};
        border-color: ${Ya.Highlight};
      }
      :host([aria-checked='true']) .checked-indicator {
        background: ${Ya.HighlightText};
      }
      :host([aria-checked='true']:not([disabled]))
        .switch:hover
        .checked-indicator {
        background: ${Ya.Highlight};
      }
      :host([disabled]) {
        opacity: 1;
      }
      :host(:${be.focusVisible}) .switch {
        border-color: ${Ya.Highlight};
        outline-offset: 2px;
        outline: solid calc(${Zt} * 1px) ${Ya.FieldText};
      }
      :host([aria-checked="true"]:${be.focusVisible}:not([disabled])) .switch {
        outline: solid calc(${Zt} * 1px) ${Ya.FieldText};
      }
      :host([disabled]) .checked-indicator {
        background: ${Ya.GrayText};
      }
      :host([disabled]) .switch {
        background: ${Ya.Field};
        border-color: ${Ya.GrayText};
      }
    `),new bi((0,Xa.css)`
        .checked-indicator {
          left: 5px;
          right: calc(((${Ja} / 2) + 1) * 1px);
        }

        :host([aria-checked='true']) .checked-indicator {
          left: calc(((${Ja} / 2) + 1) * 1px);
          right: 5px;
        }
      `,(0,Xa.css)`
        .checked-indicator {
          right: 5px;
          left: calc(((${Ja} / 2) + 1) * 1px);
        }

        :host([aria-checked='true']) .checked-indicator {
          right: calc(((${Ja} / 2) + 1) * 1px);
          left: 5px;
        }
      `));class bl extends be.Switch{}const fl=bl.compose({baseName:"switch",baseClass:be.Switch,template:be.switchTemplate,styles:gl,switch:`\n        <span class="checked-indicator" part="checked-indicator"></span>\n    `});const ml=(e,t)=>(0,Xa.css)`
  ${(0,be.display)("block")} :host {
    box-sizing: border-box;
    font-size: ${Yt};
    line-height: ${Jt};
    padding: 0 calc((6 + (${qt} * 2 * ${Et})) * 1px);
  }
`;const vl=be.TabPanel.compose({baseName:"tab-panel",template:be.tabPanelTemplate,styles:ml});const $l=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("inline-flex")} :host {
      box-sizing: border-box;
      font-family: ${It};
      font-size: ${Yt};
      line-height: ${Jt};
      height: calc(${Ja} * 1px);
      padding: calc(${qt} * 5px) calc(${qt} * 4px);
      color: ${aa};
      fill: currentcolor;
      border-radius: 0 0 calc(${_t} * 1px)
        calc(${_t} * 1px);
      border: calc(${Xt} * 1px) solid transparent;
      align-items: center;
      justify-content: center;
      grid-row: 2;
      cursor: pointer;
    }

    :host(:hover) {
      color: ${na};
      fill: currentcolor;
    }

    :host(:active) {
      color: ${na};
      fill: currentcolor;
    }

    :host([disabled]) {
      cursor: ${be.disabledCursor};
      opacity: ${Ut};
    }

    :host([disabled]:hover) {
      color: ${aa};
      background: ${Gr};
    }

    :host([aria-selected='true']) {
      background: ${Br};
      color: ${na};
      fill: currentcolor;
    }

    :host([aria-selected='true']:hover) {
      background: ${Or};
      color: ${na};
      fill: currentcolor;
    }

    :host([aria-selected='true']:active) {
      background: ${Lr};
      color: ${na};
      fill: currentcolor;
    }

    :host(:${be.focusVisible}) {
      outline: none;
      border-color: ${pr};
      box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
        ${pr};
    }

    :host(:focus) {
      outline: none;
    }

    :host(.vertical) {
      justify-content: end;
      grid-column: 2;
      border-bottom-left-radius: 0;
      border-top-right-radius: calc(${_t} * 1px);
    }

    :host(.vertical[aria-selected='true']) {
      z-index: 2;
    }

    :host(.vertical:hover) {
      color: ${na};
    }

    :host(.vertical:active) {
      color: ${na};
    }

    :host(.vertical:hover[aria-selected='true']) {
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        forced-color-adjust: none;
        border-color: transparent;
        color: ${Ya.ButtonText};
        fill: currentcolor;
      }
      :host(:hover),
      :host(.vertical:hover),
      :host([aria-selected='true']:hover) {
        background: ${Ya.Highlight};
        color: ${Ya.HighlightText};
        fill: currentcolor;
      }
      :host([aria-selected='true']) {
        background: ${Ya.HighlightText};
        color: ${Ya.Highlight};
        fill: currentcolor;
      }
      :host(:${be.focusVisible}) {
        border-color: ${Ya.ButtonText};
        box-shadow: none;
      }
      :host([disabled]),
      :host([disabled]:hover) {
        opacity: 1;
        color: ${Ya.GrayText};
        background: ${Ya.ButtonFace};
      }
    `));const xl=be.Tab.compose({baseName:"tab",template:be.tabTemplate,styles:$l});const yl=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("grid")} :host {
      box-sizing: border-box;
      font-family: ${It};
      font-size: ${Yt};
      line-height: ${Jt};
      color: ${na};
      grid-template-columns: auto 1fr auto;
      grid-template-rows: auto 1fr;
    }

    .tablist {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: auto;
      position: relative;
      width: max-content;
      align-self: end;
      padding: calc(${qt} * 4px) calc(${qt} * 4px) 0;
      box-sizing: border-box;
    }

    .start,
    .end {
      align-self: center;
    }

    .activeIndicator {
      grid-row: 1;
      grid-column: 1;
      width: 100%;
      height: 4px;
      justify-self: center;
      background: ${dr};
      margin-top: 0;
      border-radius: calc(${_t} * 1px)
        calc(${_t} * 1px) 0 0;
    }

    .activeIndicatorTransition {
      transition: transform 0.01s ease-in-out;
    }

    .tabpanel {
      grid-row: 2;
      grid-column-start: 1;
      grid-column-end: 4;
      position: relative;
    }

    :host([orientation='vertical']) {
      grid-template-rows: auto 1fr auto;
      grid-template-columns: auto 1fr;
    }

    :host([orientation='vertical']) .tablist {
      grid-row-start: 2;
      grid-row-end: 2;
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: auto 1fr;
      position: relative;
      width: max-content;
      justify-self: end;
      align-self: flex-start;
      width: 100%;
      padding: 0 calc(${qt} * 4px)
        calc((${Ja} - ${qt}) * 1px) 0;
    }

    :host([orientation='vertical']) .tabpanel {
      grid-column: 2;
      grid-row-start: 1;
      grid-row-end: 4;
    }

    :host([orientation='vertical']) .end {
      grid-row: 3;
    }

    :host([orientation='vertical']) .activeIndicator {
      grid-column: 1;
      grid-row: 1;
      width: 4px;
      height: 100%;
      margin-inline-end: 0px;
      align-self: center;
      background: ${dr};
      border-radius: calc(${_t} * 1px) 0 0
        calc(${_t} * 1px);
    }

    :host([orientation='vertical']) .activeIndicatorTransition {
      transition: transform 0.01s ease-in-out;
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      .activeIndicator,
      :host([orientation='vertical']) .activeIndicator {
        forced-color-adjust: none;
        background: ${Ya.Highlight};
      }
    `));const wl=be.Tabs.compose({baseName:"tabs",template:be.tabsTemplate,styles:yl});const kl=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("inline-block")} :host {
      font-family: ${It};
      outline: none;
      user-select: none;
    }

    .control {
      box-sizing: border-box;
      position: relative;
      color: ${na};
      background: ${Pr};
      border-radius: calc(${_t} * 1px);
      border: calc(${Xt} * 1px) solid ${Ur};
      height: calc(${Ja} * 2px);
      font: inherit;
      font-size: ${Yt};
      line-height: ${Jt};
      padding: calc(${qt} * 2px + 1px);
      width: 100%;
      resize: none;
    }

    :host([aria-invalid='true']) .control {
      border-color: ${va};
    }

    .control:hover:enabled {
      background: ${Rr};
      border-color: ${Xr};
    }

    :host([aria-invalid='true']) .control:hover:enabled {
      border-color: ${$a};
    }

    .control:active:enabled {
      background: ${Ir};
      border-color: ${Zr};
    }

    :host([aria-invalid='true']) .control:active:enabled {
      border-color: ${xa};
    }

    .control:hover,
    .control:${be.focusVisible},
    .control:disabled,
    .control:active {
      outline: none;
    }

    :host(:focus-within) .control {
      border-color: ${pr};
      box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
        ${pr};
    }

    :host([aria-invalid='true']:focus-within) .control {
      border-color: ${ya};
      box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
        ${ya};
    }

    :host([appearance='filled']) .control {
      background: ${Br};
    }

    :host([appearance='filled']:hover:not([disabled])) .control {
      background: ${Or};
    }

    :host([resize='both']) .control {
      resize: both;
    }

    :host([resize='horizontal']) .control {
      resize: horizontal;
    }

    :host([resize='vertical']) .control {
      resize: vertical;
    }

    .label {
      display: block;
      color: ${na};
      cursor: pointer;
      font-size: ${Yt};
      line-height: ${Jt};
      margin-bottom: 4px;
    }

    .label__hidden {
      display: none;
      visibility: hidden;
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
      cursor: ${be.disabledCursor};
    }
    :host([disabled]) {
      opacity: ${Ut};
    }
    :host([disabled]) .control {
      border-color: ${sa};
    }

    :host([cols]) {
      width: initial;
    }

    :host([rows]) .control {
      height: initial;
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host([disabled]) {
        opacity: 1;
      }

      :host([aria-invalid='true']) .control {
        border-style: dashed;
      }
    `));class Cl extends be.TextArea{constructor(){super(...arguments);this.appearance="outline"}}(0,ti.Cg)([Xa.attr],Cl.prototype,"appearance",void 0);const Fl=Cl.compose({baseName:"text-area",baseClass:be.TextArea,template:be.textAreaTemplate,styles:kl,shadowOptions:{delegatesFocus:true}});const Sl=(e,t)=>(0,Xa.css)`
  ${nn}

  .start,
    .end {
    display: flex;
  }
`;class Tl extends be.TextField{constructor(){super(...arguments);this.appearance="outline"}}(0,ti.Cg)([Xa.attr],Tl.prototype,"appearance",void 0);const Dl=Tl.compose({baseName:"text-field",baseClass:be.TextField,template:be.textFieldTemplate,styles:Sl,shadowOptions:{delegatesFocus:true}});var Vl=o(83021);var jl=o(49054);const zl=(e,t)=>(0,Xa.css)`
    ${(0,be.display)("inline-flex")} :host {
      --toolbar-item-gap: calc(
        (var(--design-unit) + calc(var(--density) + 2)) * 1px
      );
      background-color: ${lr};
      border-radius: calc(${_t} * 1px);
      fill: currentcolor;
      padding: var(--toolbar-item-gap);
    }

    :host(${be.focusVisible}) {
      outline: calc(${Xt} * 1px) solid ${pr};
    }

    .positioning-region {
      align-items: flex-start;
      display: inline-flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
    }

    :host([orientation='vertical']) .positioning-region {
      flex-direction: column;
    }

    ::slotted(:not([slot])) {
      flex: 0 0 auto;
      margin: 0 var(--toolbar-item-gap);
    }

    :host([orientation='vertical']) ::slotted(:not([slot])) {
      margin: var(--toolbar-item-gap) 0;
    }

    .start,
    .end {
      display: flex;
      margin: auto;
      margin-inline: 0;
    }

    ::slotted(svg) {
      /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
      width: 16px;
      height: 16px;
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host(:${be.focusVisible}) {
        box-shadow: 0 0 0 calc(${Zt} * 1px)
          ${Ya.Highlight};
        color: ${Ya.ButtonText};
        forced-color-adjust: none;
      }
    `));const Bl=Object.freeze({[Qi.Is.ArrowUp]:{[sl.t.vertical]:-1},[Qi.Is.ArrowDown]:{[sl.t.vertical]:1},[Qi.Is.ArrowLeft]:{[sl.t.horizontal]:{[fe.O.ltr]:-1,[fe.O.rtl]:1}},[Qi.Is.ArrowRight]:{[sl.t.horizontal]:{[fe.O.ltr]:1,[fe.O.rtl]:-1}}});class Ol extends be.FoundationElement{constructor(){super(...arguments);this._activeIndex=0;this.direction=fe.O.ltr;this.orientation=sl.t.horizontal}get activeIndex(){Xa.Observable.track(this,"activeIndex");return this._activeIndex}set activeIndex(e){if(this.$fastController.isConnected){this._activeIndex=(0,Vl.AB)(0,this.focusableElements.length-1,e);Xa.Observable.notify(this,"activeIndex")}}slottedItemsChanged(){if(this.$fastController.isConnected){this.reduceFocusableElements()}}mouseDownHandler(e){var t;const o=(t=this.focusableElements)===null||t===void 0?void 0:t.findIndex((t=>t.contains(e.target)));if(o>-1&&this.activeIndex!==o){this.setFocusedElement(o)}return true}childItemsChanged(e,t){if(this.$fastController.isConnected){this.reduceFocusableElements()}}connectedCallback(){super.connectedCallback();this.direction=(0,be.getDirection)(this)}focusinHandler(e){const t=e.relatedTarget;if(!t||this.contains(t)){return}this.setFocusedElement()}getDirectionalIncrementer(e){var t,o,r,a,i;return(i=(r=(o=(t=Bl[e])===null||t===void 0?void 0:t[this.orientation])===null||o===void 0?void 0:o[this.direction])!==null&&r!==void 0?r:(a=Bl[e])===null||a===void 0?void 0:a[this.orientation])!==null&&i!==void 0?i:0}keydownHandler(e){const t=e.key;if(!(t in Qi.Is)||e.defaultPrevented||e.shiftKey){return true}const o=this.getDirectionalIncrementer(t);if(!o){return!e.target.closest("[role=radiogroup]")}const r=this.activeIndex+o;if(this.focusableElements[r]){e.preventDefault()}this.setFocusedElement(r);return true}get allSlottedItems(){return[...this.start.assignedElements(),...this.slottedItems,...this.end.assignedElements()]}reduceFocusableElements(){var e;const t=(e=this.focusableElements)===null||e===void 0?void 0:e[this.activeIndex];this.focusableElements=this.allSlottedItems.reduce(Hl.reduceFocusableItems,[]);const o=this.focusableElements.indexOf(t);this.activeIndex=Math.max(0,o);this.setFocusableElements()}setFocusedElement(e=this.activeIndex){this.activeIndex=e;this.setFocusableElements();if(this.focusableElements[this.activeIndex]&&this.contains(document.activeElement)){this.focusableElements[this.activeIndex].focus()}}static reduceFocusableItems(e,t){var o,r,a,i;const n=t.getAttribute("role")==="radio";const l=(r=(o=t.$fastController)===null||o===void 0?void 0:o.definition.shadowOptions)===null||r===void 0?void 0:r.delegatesFocus;const s=Array.from((i=(a=t.shadowRoot)===null||a===void 0?void 0:a.querySelectorAll("*"))!==null&&i!==void 0?i:[]).some((e=>(0,jl.tp)(e)));if(!t.hasAttribute("disabled")&&!t.hasAttribute("hidden")&&((0,jl.tp)(t)||n||l||s)){e.push(t);return e}if(t.childElementCount){return e.concat(Array.from(t.children).reduce(Hl.reduceFocusableItems,[]))}return e}setFocusableElements(){if(this.$fastController.isConnected&&this.focusableElements.length>0){this.focusableElements.forEach(((e,t)=>{e.tabIndex=this.activeIndex===t?0:-1}))}}}(0,ti.Cg)([Xa.observable],Ol.prototype,"direction",void 0);(0,ti.Cg)([Xa.attr],Ol.prototype,"orientation",void 0);(0,ti.Cg)([Xa.observable],Ol.prototype,"slottedItems",void 0);(0,ti.Cg)([Xa.observable],Ol.prototype,"slottedLabel",void 0);(0,ti.Cg)([Xa.observable],Ol.prototype,"childItems",void 0);class Ll{}(0,ti.Cg)([(0,Xa.attr)({attribute:"aria-labelledby"})],Ll.prototype,"ariaLabelledby",void 0);(0,ti.Cg)([(0,Xa.attr)({attribute:"aria-label"})],Ll.prototype,"ariaLabel",void 0);(0,be.applyMixins)(Ll,be.ARIAGlobalStatesAndProperties);(0,be.applyMixins)(Ol,be.StartEnd,Ll);class Hl extends Ol{connectedCallback(){super.connectedCallback();const e=(0,be.composedParent)(this);if(e){lr.setValueFor(this,(t=>Jr.getValueFor(t).evaluate(t,lr.getValueFor(e))))}}}const Nl=Hl.compose({baseName:"toolbar",baseClass:Ol,template:be.toolbarTemplate,styles:zl,shadowOptions:{delegatesFocus:true}});const Pl=(e,t)=>{const o=e.tagFor(be.AnchoredRegion);return(0,Xa.css)`
    :host {
      contain: size;
      overflow: visible;
      height: 0;
      width: 0;
    }

    .tooltip {
      box-sizing: border-box;
      border-radius: calc(${_t} * 1px);
      border: calc(${Xt} * 1px) solid ${ea};
      box-shadow: 0 0 0 1px ${ea} inset;
      background: ${Br};
      color: ${na};
      padding: 4px;
      height: fit-content;
      width: fit-content;
      font-family: ${It};
      font-size: ${Yt};
      line-height: ${Jt};
      white-space: nowrap;
      /* TODO: a mechanism to manage z-index across components
                    https://github.com/microsoft/fast/issues/3813 */
      z-index: 10000;
    }

    ${o} {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: visible;
      flex-direction: row;
    }

    ${o}.right,
    ${o}.left {
      flex-direction: column;
    }

    ${o}.top .tooltip {
      margin-bottom: 4px;
    }

    ${o}.bottom .tooltip {
      margin-top: 4px;
    }

    ${o}.left .tooltip {
      margin-right: 4px;
    }

    ${o}.right .tooltip {
      margin-left: 4px;
    }

    ${o}.top.left .tooltip,
            ${o}.top.right .tooltip {
      margin-bottom: 0px;
    }

    ${o}.bottom.left .tooltip,
            ${o}.bottom.right .tooltip {
      margin-top: 0px;
    }

    ${o}.top.left .tooltip,
            ${o}.bottom.left .tooltip {
      margin-right: 0px;
    }

    ${o}.top.right .tooltip,
            ${o}.bottom.right .tooltip {
      margin-left: 0px;
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host([disabled]) {
        opacity: 1;
      }
    `))};const Rl=be.Tooltip.compose({baseName:"tooltip",template:be.tooltipTemplate,styles:Pl});const Il=(0,Xa.css)`
  .expand-collapse-glyph {
    transform: rotate(0deg);
  }
  :host(.nested) .expand-collapse-button {
    left: var(
      --expand-collapse-button-nested-width,
      calc(${Ja} * -1px)
    );
  }
  :host([selected])::after {
    left: calc(${Zt} * 1px);
  }
  :host([expanded]) > .positioning-region .expand-collapse-glyph {
    transform: rotate(90deg);
  }
`;const Al=(0,Xa.css)`
  .expand-collapse-glyph {
    transform: rotate(180deg);
  }
  :host(.nested) .expand-collapse-button {
    right: var(
      --expand-collapse-button-nested-width,
      calc(${Ja} * -1px)
    );
  }
  :host([selected])::after {
    right: calc(${Zt} * 1px);
  }
  :host([expanded]) > .positioning-region .expand-collapse-glyph {
    transform: rotate(90deg);
  }
`;const Ml=(0,Xa.cssPartial)`((${At} / 2) * ${qt}) + ((${qt} * ${Et}) / 2)`;const Gl=be.DesignToken.create("tree-item-expand-collapse-hover").withDefault((e=>{const t=Mr.getValueFor(e);return t.evaluate(e,t.evaluate(e).hover).hover}));const _l=be.DesignToken.create("tree-item-expand-collapse-selected-hover").withDefault((e=>{const t=zr.getValueFor(e);const o=Mr.getValueFor(e);return o.evaluate(e,t.evaluate(e).rest).hover}));const El=(e,t)=>(0,Xa.css)`
    /**
     * This animation exists because when tree item children are conditionally loaded
     * there is a visual bug where the DOM exists but styles have not yet been applied (essentially FOUC).
     * This subtle animation provides a ever so slight timing adjustment for loading that solves the issue.
     */
    @keyframes treeItemLoading {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    ${(0,be.display)("block")} :host {
      contain: content;
      position: relative;
      outline: none;
      color: ${na};
      background: ${Gr};
      cursor: pointer;
      font-family: ${It};
      --expand-collapse-button-size: calc(${Ja} * 1px);
      --tree-item-nested-width: 0;
    }

    :host(:focus) > .positioning-region {
      outline: none;
    }

    :host(:focus) .content-region {
      outline: none;
    }

    :host(:${be.focusVisible}) .positioning-region {
      border-color: ${pr};
      box-shadow: 0 0 0 calc((${Zt} - ${Xt}) * 1px)
        ${pr} inset;
      color: ${na};
    }

    .positioning-region {
      display: flex;
      position: relative;
      box-sizing: border-box;
      background: ${Gr};
      border: transparent calc(${Xt} * 1px) solid;
      border-radius: calc(${_t} * 1px);
      height: calc((${Ja} + 1) * 1px);
    }

    .positioning-region::before {
      content: '';
      display: block;
      width: var(--tree-item-nested-width);
      flex-shrink: 0;
    }

    :host(:not([disabled])) .positioning-region:hover {
      background: ${_r};
    }

    :host(:not([disabled])) .positioning-region:active {
      background: ${Er};
    }

    .content-region {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      width: 100%;
      min-width: 0;
      height: calc(${Ja} * 1px);
      margin-inline-start: calc(${qt} * 2px + 8px);
      font-size: ${Yt};
      line-height: ${Jt};
      font-weight: 400;
    }

    .items {
      /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
      font-size: calc(1em + (${qt} + 16) * 1px);
    }

    .expand-collapse-button {
      background: none;
      border: none;
      outline: none;
      /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
      width: calc((${Ml} + (${qt} * 2)) * 1px);
      height: calc((${Ml} + (${qt} * 2)) * 1px);
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-left: 6px;
      margin-right: 6px;
    }

    .expand-collapse-glyph {
      /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
      width: 16px;
      height: 16px;
      transition: transform 0.1s linear;

      pointer-events: none;
      fill: currentcolor;
    }

    .start,
    .end {
      display: flex;
      fill: currentcolor;
    }

    ::slotted(svg) {
      /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
      width: 16px;
      height: 16px;
    }

    .start {
      /* TODO: horizontalSpacing https://github.com/microsoft/fast/issues/2766 */
      margin-inline-end: calc(${qt} * 2px + 2px);
    }

    .end {
      /* TODO: horizontalSpacing https://github.com/microsoft/fast/issues/2766 */
      margin-inline-start: calc(${qt} * 2px + 2px);
    }

    :host([expanded]) > .items {
      animation: treeItemLoading ease-in 10ms;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }

    :host([disabled]) .content-region {
      opacity: ${Ut};
      cursor: ${be.disabledCursor};
    }

    :host(.nested) .content-region {
      position: relative;
      margin-inline-start: var(--expand-collapse-button-size);
    }

    :host(.nested) .expand-collapse-button {
      position: absolute;
    }

    :host(.nested:not([disabled])) .expand-collapse-button:hover {
      background: ${Gl};
    }

    :host([selected]) .positioning-region {
      background: ${Br};
    }

    :host([selected]:not([disabled])) .positioning-region:hover {
      background: ${Or};
    }

    :host([selected]:not([disabled])) .positioning-region:active {
      background: ${Lr};
    }

    :host([selected]:not([disabled])) .expand-collapse-button:hover {
      background: ${_l};
    }

    :host([selected])::after {
      /* The background needs to be calculated based on the selected background state
         for this control. We currently have no way of changing that, so setting to
         accent-foreground-rest for the time being */
      background: ${Tr};
      border-radius: calc(${_t} * 1px);
      content: '';
      display: block;
      position: absolute;
      top: calc((${Ja} / 4) * 1px);
      width: 3px;
      height: calc((${Ja} / 2) * 1px);
    }

    ::slotted(${e.tagFor(be.TreeItem)}) {
      --tree-item-nested-width: 1em;
      --expand-collapse-button-nested-width: calc(${Ja} * -1px);
    }
  `.withBehaviors(new bi(Il,Al),(0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        forced-color-adjust: none;
        border-color: transparent;
        background: ${Ya.Field};
        color: ${Ya.FieldText};
      }
      :host .content-region .expand-collapse-glyph {
        fill: ${Ya.FieldText};
      }
      :host .positioning-region:hover,
      :host([selected]) .positioning-region {
        background: ${Ya.Highlight};
      }
      :host .positioning-region:hover .content-region,
      :host([selected]) .positioning-region .content-region {
        color: ${Ya.HighlightText};
      }
      :host .positioning-region:hover .content-region .expand-collapse-glyph,
      :host .positioning-region:hover .content-region .start,
      :host .positioning-region:hover .content-region .end,
      :host([selected]) .content-region .expand-collapse-glyph,
      :host([selected]) .content-region .start,
      :host([selected]) .content-region .end {
        fill: ${Ya.HighlightText};
      }
      :host([selected])::after {
        background: ${Ya.Field};
      }
      :host(:${be.focusVisible}) .positioning-region {
        border-color: ${Ya.FieldText};
        box-shadow: 0 0 0 2px inset ${Ya.Field};
        color: ${Ya.FieldText};
      }
      :host([disabled]) .content-region,
      :host([disabled]) .positioning-region:hover .content-region {
        opacity: 1;
        color: ${Ya.GrayText};
      }
      :host([disabled]) .content-region .expand-collapse-glyph,
      :host([disabled]) .content-region .start,
      :host([disabled]) .content-region .end,
      :host([disabled])
        .positioning-region:hover
        .content-region
        .expand-collapse-glyph,
      :host([disabled]) .positioning-region:hover .content-region .start,
      :host([disabled]) .positioning-region:hover .content-region .end {
        fill: ${Ya.GrayText};
      }
      :host([disabled]) .positioning-region:hover {
        background: ${Ya.Field};
      }
      .expand-collapse-glyph,
      .start,
      .end {
        fill: ${Ya.FieldText};
      }
      :host(.nested) .expand-collapse-button:hover {
        background: ${Ya.Field};
      }
      :host(.nested) .expand-collapse-button:hover .expand-collapse-glyph {
        fill: ${Ya.FieldText};
      }
    `));const ql=be.TreeItem.compose({baseName:"tree-item",template:be.treeItemTemplate,styles:El,expandCollapseGlyph:`\n        <svg\n            viewBox="0 0 16 16"\n            xmlns="http://www.w3.org/2000/svg"\n            class="expand-collapse-glyph"\n        >\n            <path\n                d="M5.00001 12.3263C5.00124 12.5147 5.05566 12.699 5.15699 12.8578C5.25831 13.0167 5.40243 13.1437 5.57273 13.2242C5.74304 13.3047 5.9326 13.3354 6.11959 13.3128C6.30659 13.2902 6.4834 13.2152 6.62967 13.0965L10.8988 8.83532C11.0739 8.69473 11.2153 8.51658 11.3124 8.31402C11.4096 8.11146 11.46 7.88966 11.46 7.66499C11.46 7.44033 11.4096 7.21853 11.3124 7.01597C11.2153 6.81341 11.0739 6.63526 10.8988 6.49467L6.62967 2.22347C6.48274 2.10422 6.30501 2.02912 6.11712 2.00691C5.92923 1.9847 5.73889 2.01628 5.56823 2.09799C5.39757 2.17969 5.25358 2.30817 5.153 2.46849C5.05241 2.62882 4.99936 2.8144 5.00001 3.00369V12.3263Z"\n            />\n        </svg>\n    `});const Wl=(e,t)=>(0,Xa.css)`
  ${(0,be.display)("flex")} :host {
    flex-direction: column;
    align-items: stretch;
    min-width: fit-content;
    font-size: 0;
  }

  :host:focus-visible {
    outline: none;
  }
`;const Ul=be.TreeView.compose({baseName:"tree-view",template:be.treeViewTemplate,styles:Wl});const Xl=(e,t)=>(0,Xa.css)`
  .region {
    z-index: 1000;
    overflow: hidden;
    display: flex;
    font-family: ${It};
    font-size: ${Yt};
  }

  .loaded {
    opacity: 1;
    pointer-events: none;
  }

  .loading-display,
  .no-options-display {
    background: ${lr};
    width: 100%;
    min-height: calc(${Ja} * 1px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    padding: calc(${qt} * 1px);
  }

  .loading-progress {
    width: 42px;
    height: 42px;
  }

  .bottom {
    flex-direction: column;
  }

  .top {
    flex-direction: column-reverse;
  }
`;const Zl=(e,t)=>(0,Xa.css)`
    :host {
      background: ${lr};
      --elevation: 11;
      /* TODO: a mechanism to manage z-index across components
            https://github.com/microsoft/fast/issues/3813 */
      z-index: 1000;
      display: flex;
      width: 100%;
      max-height: 100%;
      min-height: 58px;
      box-sizing: border-box;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      pointer-events: auto;
      border-radius: calc(${_t} * 1px);
      padding: calc(${qt} * 1px) 0;
      border: calc(${Xt} * 1px) solid transparent;
      ${Li}
    }

    .suggestions-available-alert {
      height: 0;
      opacity: 0;
      overflow: hidden;
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        background: ${Ya.Canvas};
        border-color: ${Ya.CanvasText};
      }
    `));const Yl=(e,t)=>(0,Xa.css)`
    :host {
      display: flex;
      align-items: center;
      justify-items: center;
      font-family: ${It};
      border-radius: calc(${_t} * 1px);
      border: calc(${Zt} * 1px) solid transparent;
      box-sizing: border-box;
      background: ${Gr};
      color: ${na};
      cursor: pointer;
      fill: currentcolor;
      font-size: ${Yt};
      min-height: calc(${Ja} * 1px);
      line-height: ${Jt};
      margin: 0 calc(${qt} * 1px);
      outline: none;
      overflow: hidden;
      padding: 0 calc(${qt} * 2.25px);
      user-select: none;
      white-space: nowrap;
    }

    :host(:${be.focusVisible}[role="listitem"]) {
      border-color: ${ea};
      background: ${qr};
    }

    :host(:hover) {
      background: ${_r};
    }

    :host(:active) {
      background: ${Er};
    }

    :host([aria-selected='true']) {
      background: ${dr};
      color: ${fr};
    }

    :host([aria-selected='true']:hover) {
      background: ${ur};
      color: ${mr};
    }

    :host([aria-selected='true']:active) {
      background: ${hr};
      color: ${vr};
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        border-color: transparent;
        forced-color-adjust: none;
        color: ${Ya.ButtonText};
        fill: currentcolor;
      }

      :host(:not([aria-selected='true']):hover),
      :host([aria-selected='true']) {
        background: ${Ya.Highlight};
        color: ${Ya.HighlightText};
      }

      :host([disabled]),
      :host([disabled]:not([aria-selected='true']):hover) {
        background: ${Ya.Canvas};
        color: ${Ya.GrayText};
        fill: currentcolor;
        opacity: 1;
      }
    `));const Jl=(e,t)=>(0,Xa.css)`
        :host {
            display: flex;
            flex-direction: row;
            column-gap: calc(${qt} * 1px);
            row-gap: calc(${qt} * 1px);
            flex-wrap: wrap;
        }

        ::slotted([role="combobox"]) {
            min-width: 260px;
            width: auto;
            box-sizing: border-box;
            color: ${na};
            background: ${Pr};
            border-radius: calc(${_t} * 1px);
            border: calc(${Xt} * 1px) solid ${dr};
            height: calc(${Ja} * 1px);
            font-family: ${It};
            outline: none;
            user-select: none;
            font-size: ${Yt};
            line-height: ${Jt};
            padding: 0 calc(${qt} * 2px + 1px);
        }

        ::slotted([role="combobox"]:active) { {
            background: ${Rr};
            border-color: ${hr};
        }

        ::slotted([role="combobox"]:focus-within) {
            border-color: ${ea};
            box-shadow: 0 0 0 1px ${ea} inset;
        }
    `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      ::slotted([role='combobox']:active) {
        background: ${Ya.Field};
        border-color: ${Ya.Highlight};
      }
      ::slotted([role='combobox']:focus-within) {
        border-color: ${Ya.Highlight};
        box-shadow: 0 0 0 1px ${Ya.Highlight} inset;
      }
      ::slotted(input:placeholder) {
        color: ${Ya.GrayText};
      }
    `));const Kl=(e,t)=>(0,Xa.css)`
    :host {
      display: flex;
      align-items: center;
      justify-items: center;
      font-family: ${It};
      border-radius: calc(${_t} * 1px);
      border: calc(${Zt} * 1px) solid transparent;
      box-sizing: border-box;
      background: ${Gr};
      color: ${na};
      cursor: pointer;
      fill: currentcolor;
      font-size: ${Yt};
      height: calc(${Ja} * 1px);
      line-height: ${Jt};
      outline: none;
      overflow: hidden;
      padding: 0 calc(${qt} * 2.25px);
      user-select: none;
      white-space: nowrap;
    }

    :host(:hover) {
      background: ${_r};
    }

    :host(:active) {
      background: ${Er};
    }

    :host(:${be.focusVisible}) {
      background: ${qr};
      border-color: ${ea};
    }

    :host([aria-selected='true']) {
      background: ${dr};
      color: ${vr};
    }
  `.withBehaviors((0,be.forcedColorsStylesheetBehavior)((0,Xa.css)`
      :host {
        border-color: transparent;
        forced-color-adjust: none;
        color: ${Ya.ButtonText};
        fill: currentcolor;
      }

      :host(:not([aria-selected='true']):hover),
      :host([aria-selected='true']) {
        background: ${Ya.Highlight};
        color: ${Ya.HighlightText};
      }

      :host([disabled]),
      :host([disabled]:not([aria-selected='true']):hover) {
        background: ${Ya.Canvas};
        color: ${Ya.GrayText};
        fill: currentcolor;
        opacity: 1;
      }
    `));const Ql=be.Picker.compose({baseName:"draft-picker",template:be.pickerTemplate,styles:Xl,shadowOptions:{}});class es extends be.PickerMenu{connectedCallback(){lr.setValueFor(this,Ko);super.connectedCallback()}}const ts=es.compose({baseName:"draft-picker-menu",baseClass:be.PickerMenu,template:be.pickerMenuTemplate,styles:Zl});const os=be.PickerMenuOption.compose({baseName:"draft-picker-menu-option",template:be.pickerMenuOptionTemplate,styles:Yl});const rs=be.PickerList.compose({baseName:"draft-picker-list",template:be.pickerListTemplate,styles:Jl});const as=be.PickerListItem.compose({baseName:"draft-picker-list-item",template:be.pickerListItemTemplate,styles:Kl});const is={jpAccordion:ei,jpAccordionItem:Qa,jpAnchor:hi,jpAnchoredRegion:gi,jpAvatar:wi,jpBadge:Ci,jpBreadcrumb:Si,jpBreadcrumbItem:Di,jpButton:zi,jpCard:Pi,jpCheckbox:Mi,jpCombobox:Wi,jpDataGrid:Ki,jpDataGridCell:Yi,jpDataGridRow:Ji,jpDateField:cn,jpDesignSystemProvider:fn,jpDialog:vn,jpDisclosure:yn,jpDivider:kn,jpListbox:Fn,jpMenu:Dn,jpMenuItem:jn,jpNumberField:On,jpOption:Hn,jpPicker:Ql,jpPickerList:rs,jpPickerListItem:as,jpPickerMenu:ts,jpPickerMenuOption:os,jpProgress:Pn,jpProgressRing:In,jpRadio:_n,jpRadioGroup:Wn,jpSearch:Jn,jpSelect:el,jpSkeleton:ol,jpSlider:ll,jpSliderLabel:pl,jpSwitch:fl,jpTab:xl,jpTabPanel:vl,jpTabs:wl,jpTextArea:Fl,jpTextField:Dl,jpToolbar:Nl,jpTooltip:Rl,jpTreeItem:ql,jpTreeView:Ul,register(e,...t){if(!e){return}for(const o in this){if(o==="register"){continue}this[o]().register(e,...t)}}};function ns(e){return be.DesignSystem.getOrCreate(e).withPrefix("jp")}},8674:(e,t,o)=>{o.d(t,{AQ:()=>C,Cg:()=>l,N3:()=>k,Tt:()=>n,xN:()=>S});var r=function(e,t){r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o))e[o]=t[o]};return r(e,t)};function a(e,t){if(typeof t!=="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");r(e,t);function o(){this.constructor=e}e.prototype=t===null?Object.create(t):(o.prototype=t.prototype,new o)}var i=function(){i=Object.assign||function e(t){for(var o,r=1,a=arguments.length;r<a;r++){o=arguments[r];for(var i in o)if(Object.prototype.hasOwnProperty.call(o,i))t[i]=o[i]}return t};return i.apply(this,arguments)};function n(e,t){var o={};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0)o[r]=e[r];if(e!=null&&typeof Object.getOwnPropertySymbols==="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++){if(t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a]))o[r[a]]=e[r[a]]}return o}function l(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,n;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)if(n=e[l])i=(a<3?n(i):a>3?n(t,o,i):n(t,o))||i;return a>3&&i&&Object.defineProperty(t,o,i),i}function s(e,t){return function(o,r){t(o,r,e)}}function c(e,t,o,r,a,i){function n(e){if(e!==void 0&&typeof e!=="function")throw new TypeError("Function expected");return e}var l=r.kind,s=l==="getter"?"get":l==="setter"?"set":"value";var c=!t&&e?r["static"]?e:e.prototype:null;var d=t||(c?Object.getOwnPropertyDescriptor(c,r.name):{});var u,h=false;for(var p=o.length-1;p>=0;p--){var g={};for(var b in r)g[b]=b==="access"?{}:r[b];for(var b in r.access)g.access[b]=r.access[b];g.addInitializer=function(e){if(h)throw new TypeError("Cannot add initializers after decoration has completed");i.push(n(e||null))};var f=(0,o[p])(l==="accessor"?{get:d.get,set:d.set}:d[s],g);if(l==="accessor"){if(f===void 0)continue;if(f===null||typeof f!=="object")throw new TypeError("Object expected");if(u=n(f.get))d.get=u;if(u=n(f.set))d.set=u;if(u=n(f.init))a.unshift(u)}else if(u=n(f)){if(l==="field")a.unshift(u);else d[s]=u}}if(c)Object.defineProperty(c,r.name,d);h=true}function d(e,t,o){var r=arguments.length>2;for(var a=0;a<t.length;a++){o=r?t[a].call(e,o):t[a].call(e)}return r?o:void 0}function u(e){return typeof e==="symbol"?e:"".concat(e)}function h(e,t,o){if(typeof t==="symbol")t=t.description?"[".concat(t.description,"]"):"";return Object.defineProperty(e,"name",{configurable:true,value:o?"".concat(o," ",t):t})}function p(e,t){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(e,t)}function g(e,t,o,r){function a(e){return e instanceof o?e:new o((function(t){t(e)}))}return new(o||(o=Promise))((function(o,i){function n(e){try{s(r.next(e))}catch(t){i(t)}}function l(e){try{s(r["throw"](e))}catch(t){i(t)}}function s(e){e.done?o(e.value):a(e.value).then(n,l)}s((r=r.apply(e,t||[])).next())}))}function b(e,t){var o={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,a,i,n;return n={next:l(0),throw:l(1),return:l(2)},typeof Symbol==="function"&&(n[Symbol.iterator]=function(){return this}),n;function l(e){return function(t){return s([e,t])}}function s(l){if(r)throw new TypeError("Generator is already executing.");while(n&&(n=0,l[0]&&(o=0)),o)try{if(r=1,a&&(i=l[0]&2?a["return"]:l[0]?a["throw"]||((i=a["return"])&&i.call(a),0):a.next)&&!(i=i.call(a,l[1])).done)return i;if(a=0,i)l=[l[0]&2,i.value];switch(l[0]){case 0:case 1:i=l;break;case 4:o.label++;return{value:l[1],done:false};case 5:o.label++;a=l[1];l=[0];continue;case 7:l=o.ops.pop();o.trys.pop();continue;default:if(!(i=o.trys,i=i.length>0&&i[i.length-1])&&(l[0]===6||l[0]===2)){o=0;continue}if(l[0]===3&&(!i||l[1]>i[0]&&l[1]<i[3])){o.label=l[1];break}if(l[0]===6&&o.label<i[1]){o.label=i[1];i=l;break}if(i&&o.label<i[2]){o.label=i[2];o.ops.push(l);break}if(i[2])o.ops.pop();o.trys.pop();continue}l=t.call(e,o)}catch(s){l=[6,s];a=0}finally{r=i=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:true}}}var f=Object.create?function(e,t,o,r){if(r===undefined)r=o;var a=Object.getOwnPropertyDescriptor(t,o);if(!a||("get"in a?!t.__esModule:a.writable||a.configurable)){a={enumerable:true,get:function(){return t[o]}}}Object.defineProperty(e,r,a)}:function(e,t,o,r){if(r===undefined)r=o;e[r]=t[o]};function m(e,t){for(var o in e)if(o!=="default"&&!Object.prototype.hasOwnProperty.call(t,o))f(t,e,o)}function v(e){var t=typeof Symbol==="function"&&Symbol.iterator,o=t&&e[t],r=0;if(o)return o.call(e);if(e&&typeof e.length==="number")return{next:function(){if(e&&r>=e.length)e=void 0;return{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function $(e,t){var o=typeof Symbol==="function"&&e[Symbol.iterator];if(!o)return e;var r=o.call(e),a,i=[],n;try{while((t===void 0||t-- >0)&&!(a=r.next()).done)i.push(a.value)}catch(l){n={error:l}}finally{try{if(a&&!a.done&&(o=r["return"]))o.call(r)}finally{if(n)throw n.error}}return i}function x(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat($(arguments[t]));return e}function y(){for(var e=0,t=0,o=arguments.length;t<o;t++)e+=arguments[t].length;for(var r=Array(e),a=0,t=0;t<o;t++)for(var i=arguments[t],n=0,l=i.length;n<l;n++,a++)r[a]=i[n];return r}function w(e,t,o){if(o||arguments.length===2)for(var r=0,a=t.length,i;r<a;r++){if(i||!(r in t)){if(!i)i=Array.prototype.slice.call(t,0,r);i[r]=t[r]}}return e.concat(i||Array.prototype.slice.call(t))}function k(e){return this instanceof k?(this.v=e,this):new k(e)}function C(e,t,o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=o.apply(e,t||[]),a,i=[];return a={},l("next"),l("throw"),l("return",n),a[Symbol.asyncIterator]=function(){return this},a;function n(e){return function(t){return Promise.resolve(t).then(e,u)}}function l(e,t){if(r[e]){a[e]=function(t){return new Promise((function(o,r){i.push([e,t,o,r])>1||s(e,t)}))};if(t)a[e]=t(a[e])}}function s(e,t){try{c(r[e](t))}catch(o){h(i[0][3],o)}}function c(e){e.value instanceof k?Promise.resolve(e.value.v).then(d,u):h(i[0][2],e)}function d(e){s("next",e)}function u(e){s("throw",e)}function h(e,t){if(e(t),i.shift(),i.length)s(i[0][0],i[0][1])}}function F(e){var t,o;return t={},r("next"),r("throw",(function(e){throw e})),r("return"),t[Symbol.iterator]=function(){return this},t;function r(r,a){t[r]=e[r]?function(t){return(o=!o)?{value:k(e[r](t)),done:false}:a?a(t):t}:a}}function S(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],o;return t?t.call(e):(e=typeof v==="function"?v(e):e[Symbol.iterator](),o={},r("next"),r("throw"),r("return"),o[Symbol.asyncIterator]=function(){return this},o);function r(t){o[t]=e[t]&&function(o){return new Promise((function(r,i){o=e[t](o),a(r,i,o.done,o.value)}))}}function a(e,t,o,r){Promise.resolve(r).then((function(t){e({value:t,done:o})}),t)}}function T(e,t){if(Object.defineProperty){Object.defineProperty(e,"raw",{value:t})}else{e.raw=t}return e}var D=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t};function V(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var o in e)if(o!=="default"&&Object.prototype.hasOwnProperty.call(e,o))f(t,e,o);D(t,e);return t}function j(e){return e&&e.__esModule?e:{default:e}}function z(e,t,o,r){if(o==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof t==="function"?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return o==="m"?r:o==="a"?r.call(e):r?r.value:t.get(e)}function B(e,t,o,r,a){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof t==="function"?e!==t||!a:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?a.call(e,o):a?a.value=o:t.set(e,o),o}function O(e,t){if(t===null||typeof t!=="object"&&typeof t!=="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof e==="function"?t===e:e.has(t)}function L(e,t,o){if(t!==null&&t!==void 0){if(typeof t!=="object"&&typeof t!=="function")throw new TypeError("Object expected.");var r,a;if(o){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");r=t[Symbol.dispose];if(o)a=r}if(typeof r!=="function")throw new TypeError("Object not disposable.");if(a)r=function(){try{a.call(this)}catch(e){return Promise.reject(e)}};e.stack.push({value:t,dispose:r,async:o})}else if(o){e.stack.push({async:true})}return t}var H=typeof SuppressedError==="function"?SuppressedError:function(e,t,o){var r=new Error(o);return r.name="SuppressedError",r.error=e,r.suppressed=t,r};function N(e){function t(t){e.error=e.hasError?new H(t,e.error,"An error was suppressed during disposal."):t;e.hasError=true}function o(){while(e.stack.length){var r=e.stack.pop();try{var a=r.dispose&&r.dispose.call(r.value);if(r.async)return Promise.resolve(a).then(o,(function(e){t(e);return o()}))}catch(i){t(i)}}if(e.hasError)throw e.error}return o()}var P={__extends:a,__assign:i,__rest:n,__decorate:l,__param:s,__metadata:p,__awaiter:g,__generator:b,__createBinding:f,__exportStar:m,__values:v,__read:$,__spread:x,__spreadArrays:y,__spreadArray:w,__await:k,__asyncGenerator:C,__asyncDelegator:F,__asyncValues:S,__makeTemplateObject:T,__importStar:V,__importDefault:j,__classPrivateFieldGet:z,__classPrivateFieldSet:B,__classPrivateFieldIn:O,__addDisposableResource:L,__disposeResources:N}}}]);
//# sourceMappingURL=5403.b5f463dde6a0e32dcc87.js.map?v=b5f463dde6a0e32dcc87