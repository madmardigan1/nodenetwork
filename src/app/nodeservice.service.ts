import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Node } from './node';
@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private nodes: Node[] = [
    { id: 1, label: 'Node 1', quality: 100, time: 5, size: 10 },
    { id: 2, label: 'Node 2', quality: 55, time: 1 ,size: 20 },
    { id: 3, label: 'Node 3', quality: 12, time: 4,size: 15 },
    { id: 4, label: 'Node 4', quality: -75, time: 9,size: 30  },
    { id: 5, label: 'Node 5', quality: -99, time: 6,size: 40  },
    { id: 6, label: 'Node 3', quality: 3, time: 5,size: 50 },
    { id: 7, label: 'Node 4', quality: 56, time: 3 ,size: 5 },
    { id: 8, label: 'Node 5', quality: 29, time: 4 ,size: 12 },
    { id: 9, label: 'Node 3', quality: -10, time: 2 ,size: 30},
    { id: 10, label: 'Node 4', quality: -40, time: 7 ,size: 30 },
    { id: 11, label: 'Node 5', quality: -80, time: 8 ,size: 30 }
  ];

  private edges = [
    { from: 1, to: 2, width: 4},
    { from: 1, to: 3, width: 4 },
    { from: 2, to: 4, width: 4 },
    { from: 2, to: 5, width: 4 },
    { from: 5, to: 6, width: 4 },
    { from: 6, to: 10, width: 4 },
    { from: 7, to: 9, width: 4 },
    { from: 8, to: 11, width: 4 },
    { from: 3, to: 8, width: 4 },
    { from: 4, to: 7, width: 4 },
  

  ];

  constructor() {}

  getNodes(): Observable<any> {
    return of(this.nodes);
  }

  getEdges(): Observable<any> {
    return of(this.edges);
  }
}

