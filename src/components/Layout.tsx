import SideNav from './SideNav';

const Layout = ({ children }: { children: JSX.Element }) => {
	return (
		<main className='w-full flex justify-center'>
			<section className='relative w-full' style={{ maxWidth: '750px' }}>
				<div>
					<SideNav />
					{children}
				</div>
			</section>
		</main>
	);
};

export default Layout;
