import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // const input = document.getElementById("text")!;
    const normal = document.getElementById("normal")!;
    const debounseText = document.getElementById("debounse")!;
    const throttleText = document.getElementById("throttle")!;

    const debounseTimeout = debounse((e: string) => {
      debounseText.textContent = e;
    }, 500);

    const throttleTimeout = throttle((e: string) => {
      throttleText.textContent = e;
    }, 500);

    // input.addEventListener("input", (e: Event) => {
    //   normal.textContent = (e.target as HTMLInputElement).value;
    //   debounceTimeout((e.target as HTMLInputElement).value);
    //   throttleTimeout((e.target as HTMLInputElement).value);
    // });

    function debounse(cb:Function, time:number = 1000) {
      let timeout:number;
      return (...args:any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb(...args);
        },time);
      }
    }

    function throttle(cb:Function, time:number = 1000) {
      let waiting:boolean = false;
      let waitingArgs:any;
      let timeoutFunc:Function = () => {
        if(waitingArgs == null) {
          waiting = false;
        } else {
          cb(...waitingArgs);
          waitingArgs = null;
          setTimeout(timeoutFunc,time);
        }
      }
      return (...args:any) => {
        if(waiting) {
          waitingArgs = args;
          return;
        }
        cb(...args);
        waiting = true;
        setTimeout(timeoutFunc, time);
      }
    }

    document.addEventListener("mousemove", () => {
      incrementCount(normal);
      debounseTimeout(String((parseInt(debounseText.innerText) || 0) + 1));
      throttleTimeout(String((parseInt(throttleText.innerText) || 0) + 1));
    });

    function incrementCount(element: HTMLElement) {
      element.textContent = String((parseInt(element.innerText) || 0) + 1);
    }

  }, []);

  return (
    <main>
      <input type="text" name="text" id="text" />
      <div>
        Normal: <span id="normal"></span>
      </div>
      <div>
        Debouncing: <span id="debounse"></span>
      </div>
      <div>
        Throttle: <span id="throttle"></span>
      </div>
    </main>
  )
}

export default App
