import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'moviemaker';
  public nodenumber: string = '';

  public isPopupOpen = false;

  closePopup() {
    this.isPopupOpen = false;
  }

  openPopup() {
    this.isPopupOpen = true;
  
  }
  onNodeClicked(nodeId: any) {
    this.scroll(nodeId);
  }

  scroll(nodeId: number) {
    let element = document.getElementById(`node${nodeId}`);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }
}

