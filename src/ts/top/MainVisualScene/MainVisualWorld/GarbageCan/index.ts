import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import EventEmitter from 'wolfy87-eventemitter';

import garbageCanVert from './shaders/garbageCan.vs';
import garbageCanFrag from './shaders/garbageCan.fs';

export class GarbageCan extends EventEmitter {

	private commonUniforms: ORE.Uniforms;
	private root: THREE.Mesh;
	private meshList: THREE.Mesh[] = [];

	constructor( root: THREE.Mesh, parentUniforms: ORE.Uniforms ) {

		super();

		this.root = root;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
			colorTex: window.mainVisualManager.assetManager.getTex( 'garbageCanCol' )
		} );

		/*-------------------------------
			Mesh
		-------------------------------*/

		this.root.traverse( obj => {

			let mesh = obj as THREE.Mesh;
			let baseMat = mesh.material as THREE.MeshStandardMaterial;

			if ( mesh.isMesh ) {

				mesh.material = new THREE.ShaderMaterial( {
					vertexShader: garbageCanVert,
					fragmentShader: garbageCanFrag,
					uniforms: ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
					} )
				} );

			}

		} );

	}

}
