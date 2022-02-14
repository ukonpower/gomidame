import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import EventEmitter from 'wolfy87-eventemitter';

import paperVert from './shaders/paper.vs';
import paperFrag from './shaders/paper.fs';

export class Papers extends EventEmitter {

	private commonUniforms: ORE.Uniforms;
	private root: THREE.Object3D;
	private meshList: THREE.Mesh[] = [];

	constructor( root: THREE.Object3D, parentUniforms: ORE.Uniforms ) {

		super();

		this.root = root;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
			colorTex: window.mainVisualManager.assetManager.getTex( 'paperCol' )
		} );

		/*-------------------------------
			Mesh
		-------------------------------*/

		this.root.traverse( obj => {

			let mesh = obj as THREE.Mesh;
			let baseMat = mesh.material as THREE.MeshStandardMaterial;

			if ( mesh.isMesh ) {

				mesh.material = new THREE.ShaderMaterial( {
					vertexShader: paperVert,
					fragmentShader: paperFrag,
					uniforms: ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
					} )
				} );

			}

		} );

	}

}
