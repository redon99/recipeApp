import BarChartIcon from '@mui/icons-material/BarChart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const links = [
  { id: 1, text: 'Stats', path: 'stats', icon: <BarChartIcon /> },
  {
    id: 2,
    text: 'All recipes',
    path: 'All-recipes',
    icon: <ManageSearchIcon />,
  },
  { id: 3, text: 'Add recipe', path: 'add-recipe', icon: <LibraryAddIcon /> },
  { id: 4, text: 'Profile', path: 'profile', icon: <AccountBoxIcon /> },
];

export default links;
