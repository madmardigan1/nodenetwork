import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataSet, Network } from 'vis-network/standalone';
import { NodeService } from '../nodeservice.service';
import { Node } from '../node';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements AfterViewInit, OnInit {
  @ViewChild('visNetwork', { static: false }) visNetwork!: ElementRef;
  @ViewChild('nodeList', { static: false }) nodeList!: ElementRef;
  @Output() nodeClicked = new EventEmitter<number>();
  @Output() closePopup = new EventEmitter();


  network!: Network;
  selectedNodeIndex: number | null = null;
  nodes: Node[] = [];
  edges = [];
  edgesDataSet = new DataSet<any>([]); // Adding the DataSet for edges.
  nodesDataSet = new DataSet<Node>([]);
  positions: any;

  constructor(private nodeService: NodeService) {}

  close() {
    this.closePopup.emit();
  }
  ngOnInit() {
    this.nodeService.getNodes().subscribe((data: Node[]) => {
      data.forEach(node => {
        if (node.quality! >= 50) {
          node.color = {
            border: '#00FF00',  // Green for high quality
          };
        } else if (node.quality! >= 0) {
          node.color = {
            border: '#FFFF00'  // Yellow for medium quality
          };
        } else if (node.quality! >= -50) {
          node.color = {
            border: '#FFA500'  // Orange for low quality
          };
        } else {
          node.color = {
            border: '#FF0000'  // Red for very low quality
          };
        }
        node.borderWidth = 4;
      });
      this.nodes = data;
      this.nodesDataSet.add(this.nodes);  // Add the new data
    });

    this.nodeService.getEdges().subscribe(data => {
      this.edges = data;
      this.edgesDataSet.add(this.edges); // Adding edges to DataSet
    });
  }

  ngAfterViewInit() {
    const nodesDataSet = new DataSet(this.nodes);
    const edgesDataSet = new DataSet(this.edges);

    const data = {
      nodes: nodesDataSet,
      edges: edgesDataSet
    };

    const options = {
      layout: {
        hierarchical: {direction: "UD", sortMethod: "directed",}
      },
      nodes: {
        physics: true,
        shape: "dot",
        shadow: true,
      },
      manipulation: {
        enabled: false,
      },
      interaction:{
        dragNodes:false,
        navigationButtons: true,
        keyboard: true,
      },
      edges: {
        Color: "000000",
        edgeWidth: 4,
        shadow: true,
        smooth: false,
      }
    };

    this.network = new Network(this.visNetwork.nativeElement, data, options);

    this.network.once("initRedraw", () => {
      this.network.storePositions();
      this.network.setData({
        nodes: this.nodes,
        edges: this.edges,
      });
    });

    this.network.on('click', params => {
      if (params.nodes.length > 0) {
        const clickedNodeId = params.nodes[0];
        this.nodeClicked.emit(clickedNodeId);
        // zoom to the clicked node
        this.network.focus(clickedNodeId, {
          scale: 1.0,
          animation: {
            duration: 500,
            easingFunction: 'easeInOutQuad'
          }
         
        });

  
      }
    });
  }
}
