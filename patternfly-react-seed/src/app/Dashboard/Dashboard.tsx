import * as React from 'react';
import { Panel, PanelMain, PanelMainBody } from '@patternfly/react-core';
import * as AsciinemaPlayer from 'asciinema-player';
import '@app/asciinema-player.css'

class Dashboard extends React.Component {
  timerID;
  player:AsciinemaPlayer;
  castSize;
    
  componentDidMount() {
    this.updateCastFile();
    this.timerID = setInterval(
      () => this.updateCastFile(),
      10000
    );
  }

  updateCastFile() {
    fetch('/demo.cast')
    .then((response) => {
      if (this.castSize == response.headers.get("content-length")) {
        return;
      }

      this.castSize = response.headers.get("content-length");
      var time = 0;
      if (this.player) {
        time = this.player.getCurrentTime();
        this.player.dispose();
      }
      this.player = AsciinemaPlayer.create({data: response}, document.getElementById("demo"), {autoPlay:true, startAt: time, rows: 20, idleTime: 3});
    }).catch(console.log)
  }

  render() {
    return (
      <div className="App">
        <Panel>
          <PanelMain>
            <PanelMainBody style={{width:"1300px"}}>
              <span id = "demo"></span>
            </PanelMainBody>
          </PanelMain>
        </Panel>
      </div>
      
    );
  }
}

export { Dashboard };
