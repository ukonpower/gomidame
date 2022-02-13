import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import EventEmitter from 'wolfy87-eventemitter';

import garbageVert from './shaders/garbage.vs';
import garbageFrag from './shaders/garbage.fs';

export class Garbages extends EventEmitter {

	private commonUniforms: ORE.Uniforms;
	private root: THREE.Object3D;
	private meshList: THREE.Mesh[] = [];

	constructor( root: THREE.Object3D, parentUniforms: ORE.Uniforms ) {

		super();

		this.root = root;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
			colorTex: window.mainVisualManager.assetManager.getTex( 'garbageCol' )
		} );

		/*-------------------------------
			Mesh
		-------------------------------*/

		this.root.traverse( obj => {

			let mesh = obj as THREE.Mesh;
			let baseMat = mesh.material as THREE.MeshStandardMaterial;

			if ( mesh.isMesh ) {

				mesh.material = new THREE.ShaderMaterial( {
					vertexShader: garbageVert,
					fragmentShader: garbageFrag,
					uniforms: ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
					} )
				} );

			}

		} );

	}

}
