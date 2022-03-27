import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import thumbnailVert from './shaders/thumbnail.vs';
import thumbnailFrag from './shaders/thumbnail.fs';
import { GLContent } from 'src/ts/types/gl';

export class ContentItem extends THREE.Object3D {

	private commonUniforms: ORE.Uniforms;

	private thumbnail: THREE.Mesh;

	constructor( parentUniforms: ORE.Uniforms, glContent: GLContent ) {

		super();

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
		} );

		/*-------------------------------
			Thumbnail
		-------------------------------*/

		let thumbGeo = new THREE.PlaneBufferGeometry( 1.0, 1.0 );
		let thumbMat = new THREE.ShaderMaterial( {
			vertexShader: thumbnailVert,
			fragmentShader: thumbnailFrag,
			uniforms: ORE.UniformsLib.mergeUniforms( this.commonUniforms, {} )
		} );

		this.thumbnail = new THREE.Mesh( thumbGeo, thumbMat );
		this.add( this.thumbnail );

	}

}
