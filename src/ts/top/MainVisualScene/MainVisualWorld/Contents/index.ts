import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import { GLContent } from 'src/ts/types/gl';
import { ContentItem } from './ContentItem';

export class Contents extends THREE.Object3D {

	private commonUniforms: ORE.Uniforms;

	private glList: GLContent[];
	private itemList: ContentItem[] = [];

	constructor( parentUniforms: ORE.Uniforms, glList: GLContent[] ) {

		super();

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
		} );

		this.glList = glList;

		/*-------------------------------
			Content Item
		-------------------------------*/

		this.glList.forEach( ( item, index ) => {

			let content = new ContentItem( this.commonUniforms, item );
			content.position.x = index * 1.1;
			this.add( content );

			this.itemList.push( content );

		} );

	}

}
