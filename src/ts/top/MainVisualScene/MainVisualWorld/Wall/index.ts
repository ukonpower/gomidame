import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import EventEmitter from 'wolfy87-eventemitter';

import wallVert from './shaders/wall.vs';
import wallFrag from './shaders/wall.fs';

export class Wall extends EventEmitter {

	private commonUniforms: ORE.Uniforms;
	private root: THREE.Mesh;
	private meshList: THREE.Mesh[] = [];

	constructor( root: THREE.Mesh, parentUniforms: ORE.Uniforms ) {

		super();

		this.root = root;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
			colorTex: window.mainVisualManager.assetManager.getTex( 'wallCol' )
		} );

		/*-------------------------------
			Mesh
		-------------------------------*/

		this.root.traverse( obj => {

			let mesh = obj as THREE.Mesh;
			let baseMat = mesh.material as THREE.MeshStandardMaterial;

			if ( mesh.isMesh ) {

				mesh.material = new THREE.ShaderMaterial( {
					vertexShader: wallVert,
					fragmentShader: wallFrag,
					uniforms: ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
					} )
				} );

			}

		} );

	}

}
