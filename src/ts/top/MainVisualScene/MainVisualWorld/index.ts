import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import { LayerInfo } from '@ore-three-ts';
import { Garbages } from './Garbage';
import { GarbageCan } from './GarbageCan';
import { Wall } from './Wall';
import { Papers } from './Papers';
export class MainVisualWorld {

	private commonUniforms: ORE.Uniforms;
	private scene: THREE.Scene;

	private layerInfo: ORE.LayerInfo;

	private garbages: Garbages;
	private garbageCan: GarbageCan;
	private wall: Wall;
	private paper: Papers;

	constructor( info: LayerInfo, scene: THREE.Scene, parentUniforms: ORE.Uniforms ) {

		this.layerInfo = info;
		this.scene = scene;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
		} );

		/*-------------------------------
			Garbages
		-------------------------------*/

		this.garbages = new Garbages( this.scene.getObjectByName( 'Garbages' ) as THREE.Object3D, this.commonUniforms );

		/*-------------------------------
			Can
		-------------------------------*/

		this.garbageCan = new GarbageCan( this.scene.getObjectByName( 'GarbageCan' ) as THREE.Mesh, this.commonUniforms );

		/*-------------------------------
			Wall
		-------------------------------*/

		this.wall = new Wall( this.scene.getObjectByName( 'Wall' ) as THREE.Mesh, this.commonUniforms );

		/*-------------------------------
			Paper
		-------------------------------*/

		this.paper = new Papers( this.scene.getObjectByName( 'Papers' ) as THREE.Object3D, this.commonUniforms );


	}

	public resize( layerInfo: ORE.LayerInfo ) {

	}

}
