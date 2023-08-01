import { shuffle } from "./FormCreator";
const { v4: uuidv4 } = require("uuid");

export const FormatQuestion = ({ q }) => {
  console.log(q);
  switch (q.type) {
    case "cloze":
      return (
        <div className='w-full p-4 flex flex-col items-center justify-evenly gap-4 border-2 border-gray-600 rounded-lg'>
          <div className='w-full'>{q.question}</div>
          <div className='w-full grid grid-cols-2 gap-2'>
            {q?.options?.map((e, index) => {
              // Use index to determine which column the option should be placed in
              const column = index % 2 === 0 ? 1 : 2;

              return (
                <label
                  className={`w-full flex flex-row items-center justify-start my-2 gap-2 col-${column}`}>
                  <input type='checkbox' name='q1' value={e} />
                  <div>{e}</div>
                </label>
              );
            })}
          </div>
        </div>
      );
    case "categorize":
      const dragStartHandler = (ev) => {
        ev.dataTransfer.setData("text/plain", ev.target.id);
      };

      const dragOverHandler = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
      };

      const dropHandler = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(data);
        ev.target.appendChild(draggedElement);
      };
      let all = [...q.item.map((e) => e.val), ...q.belong.map((e) => e.val)];
      const len = q.item.length;
      all = shuffle(all);
      return (
        <>
          <div className='w-full max-w-md m-auto p-4 flex flex-col items-center justify-evenly border-2 border-gray-600 rounded-lg'>
            {/* Render the draggable elements */}
            <div className='grid grid-cols-4 items-center justify-evenly gap-2'>
              {all.map((e, index) => (
                <div
                  className='bg-gray-300 p-2 rounded-md text-center cursor-grab'
                  draggable
                  onDragStart={dragStartHandler}
                  id={`drag-${index}`} // Set a unique id for each draggable element
                >
                  {e}
                </div>
              ))}
            </div>

            {/* Render the drop area */}
            <div
              className='mt-4 w-full grid grid-cols-2 gap-2 justify-items-center p-4 border border-gray-600 rounded-lg'
              onDragOver={dragOverHandler}
              onDrop={dropHandler}>
              {new Array(len * 2).fill("").map((e, index) => (
                <div
                  key={`drop-${index}`} // Set a unique key for each drop area
                  className='bg-gray-300 h-auto w-full text-center p-2 rounded-md'></div>
              ))}
            </div>
          </div>
        </>
      );
    case "comprehension":
      return (
        <>
          <div className='w-full max-w-full m-auto p-8 gap-8 flex flex-col items-center justify-evenly border-2 border-gray-600 rounded-lg'>
            {q.img && (
              <img
                className='w-full m-auto'
                src={q.img}
                alt='Converted to Base64'
              />
            )}
            <div>{q.paragraph}</div>
            <div className='w-full px-2 mt-2 flex flex-col items-center content-center justify-center flex-wrap gap-8'>
              {q?.mcq?.map((m) => (
                <div className='w-full max-w-md m-auto p-4 flex flex-col items-center justify-evenly bg-gray-200 rounded-lg'>
                  <div className='w-full'>{m["text"]}</div>
                  <div className='w-full grid grid-cols-2 gap-2'>
                    {m["options"]?.map((e, index) => {
                      // Use index to determine which column the option should be placed in
                      const column = index % 2 === 0 ? 1 : 2;
                      return (
                        <label
                          className={`w-full flex flex-row items-center justify-start my-2 gap-2 col-${column}`}>
                          <input type='checkbox' name='q1' value={e} />
                          <div>{e}</div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    default:
      console.Error("Type unknown");
      break;
  }
};
