import type { Post } from 'App';
import type { FunctionComponent } from 'react';

type ListProps = {
  lists: Post[];
};

const List: FunctionComponent<ListProps> = ({ lists }) => {
  return (
    <div className="mt-3">
      <ul>
        {lists.map((item) => (
          <li key={item.objectID}>
            <a href={item.url} target="_blank" rel="noreferrer">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
