import * as THREE from 'three';
import * as ORE from '@ore-three-ts';
import EventEmitter from 'wolfy87-eventemitter';

import mainCanVert from './shaders/mainCan.vs';
import mainCanFrag from './shaders/mainCan.fs';

export class MainGarbageCan extends THREE.Object3D {

	private commonUniforms: ORE.Uniforms;
	private root: THREE.Mesh;
	private meshList: THREE.Mesh[] = [];

	constructor( root: THREE.Mesh, parentUniforms: ORE.Uniforms ) {

		super();

		this.root = root;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
			colorTex: window.mainVisualManager.assetManager.getTex( 'garbageCanCol' )
		} );

		let mat = new THREE.MeshStandardMaterial();
		let geo = new THREE.BoxBufferGeometry();

		let mesh = new THREE.Mesh( geo, mat );
		this.add( mesh );

	}

	public update( deltaTIme: number ) {

		let t = - this.commonUniforms.time.value * 0.1;

		this.rotation.set( - 0.2 + Math.sin( t ) * 0.1, t, Math.sin( t ) * 0.3 );

	}

}
