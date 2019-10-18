class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		node.parent = this;
	
		if (this.left != null && this.right != null) return;
		
		if (this.left == null) {
			this.left = node;

		} else {
			this.right = node;
		}

	}

	removeChild(node) {
		if (this.left.data === node.data && this.left.priority === node.priority) {
			this.left.parent = null;
			this.left = null;

		} else if(this.right.data === node.data && this.right.priority === node.priority) {
			this.right.parent = null;
			this.right = null;
		
		} else {
			throw new Error();
		}
	}

	remove() {
		if (this.parent == null) return;

		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) return;
		
		const parent = this.parent;
		const root = this.parent.parent ? this.parent.parent : null;
		const parentLeft = this.parent.left;
		const parentRight = this.parent.right;

		const currentLeft = this.left;
		const currentRight = this.right;
		
		this.parent.left = currentLeft;
		this.parent.right = currentRight;

		this.left ? this.left.parent = this.parent : null;
		this.right ? this.right.parent = this.parent : null;


		if (parentLeft == this) {
			this.left = this.parent;
			this.right = parentRight;
			parentRight ? parentRight.parent = this : null;

			this.parent.parent = this
			this.parent = root;

		} else {
			this.right = this.parent;
			this.left = parentLeft;
			parentLeft ? parentLeft.parent = this : null;

			this.parent.parent = this
			this.parent = root;

		}
		
		if(root) {
			if (root.left == parent) {
				root.left = this;
			} else {
				root.right = this;
			}
		}
		
	}

	show() {
		console.log('current(', this.data, ') => Parent(', this.parent ? this.parent.data : '', 
								') Left(', this.left ? this.left.data : '',
								') Right(', this.right ? this.right.data : '', ')');
	}
}

module.exports = Node;

