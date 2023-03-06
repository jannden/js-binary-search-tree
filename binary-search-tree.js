class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  getRootNode() {
    return this.root;
  }
  
  insert(data) {
    
    // Creating a new node
    const newNode = new TreeNode(data);
    
    // If root is empty, the new node will be the root
    // Otherwise we will find the right place with a recursive helper function
    if(this.root === null) {
      this.root = newNode;
    } else {
      this.insertDeeper(this.root, newNode);
    }
    
  }
  
  insertDeeper(currentNode, newNode) {
    
    // We should watch out for duplicates
    if(currentNode.data === newNode.data) {
      console.log("This value already exists.");
      return false;
    }
    
    // Comparing the value of the newNode to the currentNode shows us the right direction
    let direction = "";
    if(currentNode.data > newNode.data) {
      direction = "left";
    } else if(currentNode.data < newNode.data) {
      direction = "right";
    }
    
    // If there is no node here, we assign it and break out of the recursive function
    // Otherwise, we go deeper in the recursion
    if(!currentNode[direction]) {
      currentNode[direction] = newNode;
    } else {
      this.insertDeeper(currentNode[direction], newNode);
    }
    
  }
  
      
  remove(data) {
    
    // If root is empty, there is nothing to remove
    // Otherwise we will re-initialize the root with new node returned by the recursive helper function
    if(this.root === null) {
      console.log("The tree is empty.");
    } else {
      this.root = this.removeDeeper(this.root, data);
    }
    
  }

  removeDeeper(currentNode, data) {
    
    if(currentNode === null) {
      return null;
    } else if(currentNode.data === data) {
      // If we found the right node
      // We have to delete this node
      // But we have to decide what to do with it's children
      if(currentNode.left === null && currentNode.right === null) {
        
        // There are no children
        // We can safely remove the node, so we return null from the recursive function
        return null;
        
      } else if(currentNode.left === null) {
        
        // If there is no left child, we replace the currentNode with the right one
        return currentNode.right;
        
      } else if(currentNode.right === null) {
        
        // If there is no right child, we replace the currentNode with the left one
        return currentNode.left;
        
      } else {
        
        // There are both children
        // We have to replace the currentNode with the deepest left node of the right child
        let subNode = currentNode.right;
        while (subNode.left !== null) {
          // We get to the bottom till there are no more left nodes
          subNode = subNode.left;
        }
        currentNode.data = subNode.data;
        currentNode.right = this.removeDeeper(currentNode.right, subNode.data);
        return currentNode;
      }
      
    } else {
      
      // If this is not the desired node, we have to go deeper in the recursion
      if(currentNode.data > data) {
        currentNode.left = this.removeDeeper(currentNode.left, data);
        return currentNode;
      } else if (currentNode.data < data) {
        currentNode.right = this.removeDeeper(currentNode.right, data);
        return currentNode;
      }
    }
  }
  
  preOrder(currentNode) {
    if(currentNode !== null) {
      console.log(currentNode.data);
      this.preOrder(currentNode.left);
      this.preOrder(currentNode.right);
    }
  }
  
  inOrder(currentNode) {
    if(currentNode !== null) {
      this.inOrder(currentNode.left);
      console.log(currentNode.data);
      this.inOrder(currentNode.right);
    }
  }
    
  postOrder(currentNode) {
    if(currentNode !== null) {
      this.postOrder(currentNode.left);
      this.postOrder(currentNode.right);
      console.log(currentNode.data);
    }
  }
}

// Tests
const binarySearchTree = new BinarySearchTree();
 
// Insert
binarySearchTree.insert(40);
binarySearchTree.insert(30);
binarySearchTree.insert(50);
binarySearchTree.insert(25);
binarySearchTree.insert(35);
binarySearchTree.insert(45);
binarySearchTree.insert(55);
console.log(binarySearchTree);

// Remove
binarySearchTree.remove(55);
console.log(binarySearchTree);

// Traversal
const root = binarySearchTree.getRootNode();

console.log("pre-order traversal");
binarySearchTree.preOrder(root);
 
console.log("in-order traversal");
binarySearchTree.inOrder(root);

console.log("post-order traversal");
binarySearchTree.postOrder(root);