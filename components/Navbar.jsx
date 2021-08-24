import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className='container'>
				<div className='navbar-brand'>
					<Link href='/'>
						<a className='navbar-item'>
							<h1>Todo Manager</h1>
						</a>
					</Link>
					{/* <span className='navbar-burger burger' data-target='navbarMenu'>
						<span></span>
						<span></span>
						<span></span>
					</span> */}
				</div>
				<div id='' className='navbar-menu is-active'>
					<div className='navbar-end'>
						<Link href='/'>
							<a className='navbar-item is-active is-size-5 has-text-weight-semibold'>
								Home
							</a>
						</Link>
						<Link href='/resources/new'>
							<a className='navbar-item is-active is-size-5 has-text-weight-semibold'>
								Add
							</a>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
