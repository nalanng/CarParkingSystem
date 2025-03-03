import { useState } from 'react';
import calcHeaderHeight from '@helpers/layoutHeight';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CardHeader from '@/components/cardHeader';

const menuOptions = [
	{
		id: 1,
		Icon: Person2OutlinedIcon,
		text: 'Parking Area',
	},
	{
		id: 2,
		Icon: AccountBoxOutlinedIcon,
		text: 'Records',
	},
];

function SampleTabsPage() {
	const [activeIndex, setActiveIndex] = useState(1);
	return (
		<Grid container spacing={4}>
			<Grid item xs={12} sm={4} md={3}>
				<Card
					sx={{
						position: 'sticky',
						top: `${calcHeaderHeight('nav', false) + 30}px`,
					}}
					component="aside"
				>
					<MenuList
						sx={{
							'& .MuiMenuItem-root': {
								borderRadius: 2,
							},
						}}
					>
						{menuOptions.map(({ id, Icon, text }) => (
							<MenuListItem
								key={id}
								text={text}
								Icon={Icon}
								onClick={() => setActiveIndex(id)}
								selected={activeIndex === id}
							/>
						))}
					</MenuList>
				</Card>
			</Grid>
			<Grid item xs={12} sm={8} md={9}>
				{activeIndex === 1 && <Section text={activeIndex} />}
				{activeIndex === 2 && <Section text={activeIndex} />}
			</Grid>
		</Grid>
	);
}

function MenuListItem({ Icon, text, ...props }) {
	return (
		<MenuItem {...props}>
			<ListItemIcon>
				<Icon fontSize="medium" />
			</ListItemIcon>
			{text}
		</MenuItem>
	);
}

function Section({ text }) {
	return (
		<Card
			sx={{
				minHeight: '100vh',
			}}
			type="section"
		>
			<CardHeader title={`Section ${text} Title`} subtitle="Section subtitle">
				Optional Action
			</CardHeader>
			{text}
		</Card>
	);
}

export default SampleTabsPage;
