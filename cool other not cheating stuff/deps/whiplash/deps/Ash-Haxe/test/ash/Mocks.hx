package ash;

import ash.core.Engine;
import ash.core.SystemTest;
import ash.core.System;
import ash.core.Node;

class Point
{
    public function new()
    {
    }
}

class Matrix
{
    public function new()
    {
    }
}

class MockNode extends Node<MockNode>
{
    public var point:Point;
}

class MockNode2 extends Node<MockNode2>
{
    public var point:Point;
    public var matrix:Matrix;
}

class MockNode3 extends Node<MockNode3>
{
    public var matrix:Matrix;
}

class MockNode4 extends Node<MockNode4>
{
    public var pos:MockComponent;

    public function new(value:Int = 0):Void
    {
        pos = new MockComponent(value);
    }
}

class MockComponent
{
    public var value:Int;

    public function new(value:Int = 0)
    {
        this.value = value;
    }
}

class MockComponent2
{
    public var value:String;

    public function new()
    {
    }
}

class MockComponentExtended extends MockComponent
{
    public var other:Int;

    public function new()
    {
        super();
    }
}

class MockSystem extends System
{
    private var tests:SystemTest;

    public function new(tests:SystemTest)
    {
        super();
        this.tests = tests;
    }

    override public function addToEngine(engine:Engine):Void
    {
        if (tests.callBack != null)
            tests.callBack(this, "added", engine);
    }

    override public function removeFromEngine(engine:Engine):Void
    {
        if (tests.callBack != null)
            tests.callBack(this, "removed", engine);
    }

    override public function update(time:Float):Void
    {
        if (tests.callBack != null)
            tests.callBack(this, "update", time);
    }
}

class EmptySystem extends System
{
}

class EmptySystem2 extends System
{
    public var value:String;
}
