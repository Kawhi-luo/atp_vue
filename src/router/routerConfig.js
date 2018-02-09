import home from '../component/home'
import meta from '../component/meta'
import font from '../component/font'
import link from '../component/link'
import path from '../component/path'
import view from '../component/view'
import foot from '../component/foot'
import copy from '../component/copy'
import copyen from '../component/copyen'
import workflow from '../component/workflow'
import image from '../component/image'
import mp4 from '../component/mp4'
export default[
{
	path:'/home',
	name:'home',
	component:home
},
{
	path:'/meta',
	name:'meta',
	component:meta
},
{
	path:'/font',
	name:'font',
	component:font
},
{
	path:'/link',
	name:'link',
	component:link
},
{
	path:'/path',
	name:'path',
	component:path
},
{
	path:'/view',
	name:'view',
	component:view
},
{
	path:'/foot',
	name:'foot',
	component:foot
},
{
	path:'/copy',
	name:'copy',
	component:copy
},
{
	path:'/copyen',
	name:'copyen',
	component:copyen
},
{
	path:'/workflow',
	name:'workflow',
	component:workflow
},
{
	path:'/image',
	name:'image',
	component:image
},
{
	path:'/mp4',
	name:'mp4',
	component:mp4
},
{
	path:'*',redirect:'/home'
}
]